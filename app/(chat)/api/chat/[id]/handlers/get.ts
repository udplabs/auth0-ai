import { getChat } from '@/lib/api/chat/get-chat';
import { getUser } from '@/lib/auth0';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Fetch a chat by ID
export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<ApiPathParams> }
) {
	try {
		const user = await getUser();
		const { id } = await params;

		if (!id) {
			const { APIError } = await import('@/lib/errors');
			throw new APIError('bad_request:api', 'Chat ID is required');
		}

		const data = await getChat({ id, userId: user.sub, includeMessages: true });

		return NextResponse.json({ data });
	} catch (error: unknown) {
		const { handleApiError } = await import('@/lib/errors');
		return handleApiError(error);
	}
}
