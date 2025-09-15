import { getTransactions } from '@/lib/api/accounts/get-transactions';
import { getUser } from '@/lib/auth0/client';
import { handleApiError } from '@/lib/errors';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<ApiPathParams> }
) {
	try {
		const user = await getUser();

		const { id: accountId } = (await params) || {};

		const data = await getTransactions({ accountId, userId: user.sub });

		return NextResponse.json(data);
	} catch (error: unknown) {
		return handleApiError(error);
	}
}
