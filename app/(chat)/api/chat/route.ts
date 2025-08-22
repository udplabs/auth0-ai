import { getUser } from '@/lib/auth0/client';
import { APIError } from '@/lib/errors';
import { getSearchParams } from '@/lib/utils/get-search-params';
import { type NextRequest, NextResponse } from 'next/server';
import { getChatHistory } from '../actions';

interface GetChatsParams extends ApiQueryParams {
	grouped?: 'true' | 'false';
}
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
		if (error instanceof APIError) {
			return error.toResponse();
		}
		console.error(error);
		return new APIError(error).toResponse();
	}
}
