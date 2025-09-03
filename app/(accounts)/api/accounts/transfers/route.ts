import { getUser } from '@/lib/auth0';
import { createTransfer } from '@/lib/db/queries/accounts/mutate-transactions';
import { APIError } from '@/lib/errors';
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const user = await getUser();

		const body = (await request.json()) as Transfers.CreateTransactionInput;

		console.log(body);
		if (!body) {
			throw new APIError('bad_request:api', 'Invalid request body.');
		}

		const customerId = user.sub;

		const transferId = await createTransfer({ ...body, customerId });

		revalidateTag('accounts');

		return NextResponse.json(transferId);
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError(error).toResponse();
	}
}
