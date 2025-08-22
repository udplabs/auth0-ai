import { getUser } from '@/lib/auth0/client';
import { voteMessage } from '@/lib/db/queries/message';
import { APIError } from '@/lib/errors';
import { type NextRequest, NextResponse } from 'next/server';

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<ApiPathParams> }
) {
	try {
		const user = await getUser();

		const { id } = await params;

		if (!id) {
			throw new APIError('bad_request:vote', 'Message Id is required.');
		}

		const { vote = 'UP' } =
			((await request.json()) as { vote: 'UP' | 'DOWN' }) || {};

		const data = await voteMessage(user.sub, id, vote);

		return NextResponse.json({ data });
	} catch (error: unknown) {
		if (error instanceof APIError) {
			if (error.type === 'unauthorized') {
				// Don't expose 'unauthorized' errors as they may leak information
				// about the existence of documents.
				return new APIError(
					'not_found:vote',
					'Unable to add your vote at this time. Please try again later.'
				).toResponse();
			}
			return error.toResponse();
		}
		console.error(error);
		return new APIError(
			'server_error:vote',
			(error as Error)?.message
		).toResponse();
	}
}
