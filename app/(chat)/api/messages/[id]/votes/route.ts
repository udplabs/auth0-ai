import { auth0 } from '@/lib/auth0';
import { voteMessage } from '@/lib/db';
import { APIError } from '@/lib/errors';
import { type NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<ApiPathParams> },
) {
  try {
    const { user } = (await auth0.getSession()) || {};

    if (!user?.sub) {
      throw new APIError('unauthorized:vote');
    }

    const { id } = await context.params;

    if (!id) {
      throw new APIError('bad_request:vote', 'Message Id is required.');
    }

    const { vote = 'UP' } =
      ((await request.json()) as { vote: 'UP' | 'DOWN' }) || {};

    await voteMessage(user.sub, id, vote);

    return NextResponse.json({}, { status: 204 });
  } catch (error: unknown) {
    if (error instanceof APIError) {
      if (error.type === 'unauthorized') {
        // Don't expose 'unauthorized' errors as they may leak information
        // about the existence of documents.
        return new APIError(
          'not_found:vote',
          'Unable to add your vote at this time. Please try again later.',
        ).toResponse();
      }
      return error.toResponse();
    }
    console.error(error);
    return new APIError(
      'server_error:vote',
      (error as Error)?.message,
    ).toResponse();
  }
}
