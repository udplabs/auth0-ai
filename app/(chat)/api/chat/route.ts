import { getChatHistory } from '@/lib/api/chat/get-chat';
import { getUser } from '@/lib/auth0/client';
import { handleApiError } from '@/lib/errors';
import { getSearchParams } from '@/lib/utils/get-search-params';
import { type NextRequest, NextResponse } from 'next/server';

interface GetChatsParams extends ApiQueryParams {
	grouped?: boolean;
}
// Fetches chat history [for sidebar].
export async function GET(request: NextRequest) {
	try {
		console.log('fetching chat history...');
		const user = await getUser();

		const {
			page,
			page_size: pageSize,
			grouped,
		} = getSearchParams<GetChatsParams>(request, [
			'page',
			'page_size',
			'grouped',
		]);

		const data = await getChatHistory({
			userId: user.sub,
			page,
			pageSize,
			grouped,
		});

		return NextResponse.json(data);
	} catch (error: unknown) {
		return handleApiError(error);
	}
}
