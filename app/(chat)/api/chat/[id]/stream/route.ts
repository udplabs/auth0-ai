import { getStreamContext } from '@/app/(chat)/api/chat/[id]/handlers/post';
import { getUser } from '@/lib/auth0/client';
import { getChatById } from '@/lib/db/queries/chat';
import { getMessagesByChatId } from '@/lib/db/queries/message';
import { getStreamIdsByChatId } from '@/lib/db/queries/stream';
import { APIError } from '@/lib/errors';
import { createUIMessageStream, JsonToSseTransformStream } from 'ai';
import { differenceInSeconds } from 'date-fns';
import { NextResponse } from 'next/server';

/**
 * This route is automatically called by useChat to handle resumable streams.
 *
 * It must be here (unless you remove support for resumable streams).
 */
export async function GET(
	_: Request,
	{ params }: { params: Promise<ApiPathParams> }
) {
	try {
		const { id: chatId } = await params;

		const streamContext = getStreamContext();
		const resumeRequestedAt = new Date();

		if (!streamContext) {
			return new Response(null, { status: 204 });
		}

		if (!chatId) {
			throw new APIError('bad_request:api');
		}

		const user = await getUser();

		const chat = await getChatById(chatId, user.sub);

		if (!chat) {
			throw new APIError('not_found:chat');
		}

		const streamIds = await getStreamIdsByChatId(chatId);

		if (!streamIds.length) {
			throw new APIError('not_found:stream');
		}

		const recentStreamId = streamIds.at(-1);

		if (!recentStreamId) {
			throw new APIError('not_found:stream');
		}

		const emptyDataStream = createUIMessageStream<Chat.UIMessage>({
			execute: () => {},
		});

		const stream = await streamContext.resumableStream(recentStreamId, () =>
			emptyDataStream.pipeThrough(new JsonToSseTransformStream())
		);

		/*
		 * For when the generation is streaming during SSR
		 * but the resumable stream has concluded at this point.
		 */
		if (!stream) {
			const messages = await getMessagesByChatId(chatId);
			const mostRecentMessage = messages.at(-1);

			if (!mostRecentMessage) {
				return NextResponse.json(emptyDataStream, { status: 200 });
			}

			if (mostRecentMessage.role !== 'assistant') {
				return NextResponse.json(emptyDataStream, { status: 200 });
			}

			const messageCreatedAt = new Date(
				mostRecentMessage?.metadata?.createdAt || ''
			);

			if (differenceInSeconds(resumeRequestedAt, messageCreatedAt) > 15) {
				return NextResponse.json(emptyDataStream, { status: 200 });
			}

			const restoredStream = createUIMessageStream<Chat.UIMessage>({
				execute: ({ writer }) => {
					writer.write({
						type: 'data-appendMessage',
						data: JSON.stringify(mostRecentMessage),
						transient: true,
					});
				},
			});

			return NextResponse.json(
				restoredStream.pipeThrough(new JsonToSseTransformStream()),
				{ status: 200 }
			);
		}

		return NextResponse.json(stream, { status: 200 });
	} catch (error: unknown) {
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError(error).toResponse();
	}
}
