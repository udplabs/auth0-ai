import { getTransactions } from '@/app/(accounts)/actions';
import { getUser } from '@/lib/auth0/client';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<ApiPathParams> }
) {
	const user = await getUser();

	const { id: accountId } = (await params) || {};

	const data = await getTransactions({ accountId, userId: user.sub });

	return NextResponse.json(data);
}
