import { auth0 } from '@/lib/auth0';
import { getMessagesByChatId, getStreamIdsByChatId } from '@/lib/db';
import { APIError } from '@/lib/errors';

import { createUIMessageStream, JsonToSseTransformStream } from 'ai';
import { getStreamContext } from '@/app/(chat)/actions';
import { differenceInSeconds } from 'date-fns';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: chatId } = await params;

    const streamContext = getStreamContext(null);
    const resumeRequestedAt = new Date();

    if (!streamContext) {
      return new NextResponse(null, { status: 204 });
    }

    if (!chatId) {
      throw new APIError('bad_request:api');
    }

    const { user } = (await auth0.getSession()) || {};

    if (!user?.sub) {
      return new APIError(
        'unauthorized:stream',
        'You must be logged in to access streams.',
      );
    }

    const streamIds = await getStreamIdsByChatId(chatId);

    if (!streamIds.length) {
      throw new APIError('not_found:stream');
    }

    const recentStreamId = streamIds.at(-1);

    if (!recentStreamId) {
      throw new APIError('not_found:stream');
    }

    const emptyDataStream = createUIMessageStream<ChatMessage>({
      execute: () => {},
    });

    const stream = await streamContext.resumableStream(recentStreamId, () =>
      emptyDataStream.pipeThrough(new JsonToSseTransformStream()),
    );

    /*
     * For when the generation is streaming during SSR
     * but the resumable stream has concluded at this point.
     */
    if (!stream) {
      const messages = await getMessagesByChatId(chatId);
      const mostRecentMessage = messages.at(-1);

      if (!mostRecentMessage) {
        return new NextResponse(emptyDataStream, { status: 200 });
      }

      if (mostRecentMessage.role !== 'assistant') {
        return new NextResponse(emptyDataStream, { status: 200 });
      }

      const messageCreatedAt = new Date(mostRecentMessage.created_at);

      if (differenceInSeconds(resumeRequestedAt, messageCreatedAt) > 15) {
        return new NextResponse(emptyDataStream, { status: 200 });
      }

      const restoredStream = createUIMessageStream<ChatMessage>({
        execute: ({ writer }) => {
          writer.write({
            type: 'data-appendMessage',
            data: JSON.stringify(mostRecentMessage),
            transient: true,
          });
        },
      });

      return new NextResponse(
        restoredStream.pipeThrough(new JsonToSseTransformStream()),
        { status: 200 },
      );
    }

    return new NextResponse(stream, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof APIError) {
      // Don't expose 'unauthorized' errors as they may leak information
      // about the existence of documents.
      if (error.type === 'unauthorized') {
        return new APIError(
          'not_found:stream',
          'Stream not found.',
        ).toResponse();
      }
      return error.toResponse();
    }
    console.error(error);
    return new APIError(
      'server_error:api',
      (error as Error)?.message,
    ).toResponse();
  }
}
