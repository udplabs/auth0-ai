import { chatKey } from '@/lib/api/chat/get-chat';
import { getUser } from '@/lib/auth0';
import { deleteChatById } from '@/lib/db/queries/chat/mutate-chats';
import { APIError } from '@/lib/errors';
import { revalidateTag } from 'next/cache';

import type { NextRequest } from 'next/server';

export const maxDuration = 60;

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

		revalidateTag(chatKey({ userId: user.sub }));

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
