import { chatKey, getChat } from '@/lib/api/chat/get-chat';
import { getUser } from '@/lib/auth0/client';
import { deleteChatById } from '@/lib/db/queries/chat/mutate-chats';
import { APIError, handleApiError } from '@/lib/errors';
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
export { POST } from './_handlers/post';

// Fetch a chat by ID
export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<ApiPathParams> }
) {
	try {
		const user = await getUser();
		const { id } = await params;

		if (!id) {
			throw new APIError('bad_request:api', 'Chat ID is required');
		}

		const data = await getChat({ id, userId: user.sub, includeMessages: true });

		return NextResponse.json({ data });
	} catch (error: unknown) {
		return handleApiError(error);
	}
}
/**
 *
 * Deletes an individual chat by `chatId`.
 */
export async function DELETE(
	_: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await context.params;

		if (!id) {
			throw new APIError('bad_request:api');
		}

		const user = await getUser();

		await deleteChatById(id, user.sub);

		revalidateTag(chatKey({ userId: user.sub, id }));

		return Response.json(null, { status: 201 });
	} catch (error: unknown) {
		if (error instanceof APIError) {
			if (error.type === 'unauthorized') {
				// Don't expose 'unauthorized' errors as they may leak information
				// about the existence of chats.
				return new APIError(
					'forbidden:chat',
					'Unable to delete this chat at this time.'
				).toResponse();
			}
			return error.toResponse();
		}
		console.error(error);
		return new APIError(error).toResponse();
	}
}
