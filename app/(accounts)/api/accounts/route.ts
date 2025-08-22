import { createAccount, getAccounts } from '@/app/(accounts)/actions';
import { getUser } from '@/lib/auth0/client';
import { APIError } from '@/lib/errors';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
	// const userId = 'auth0|683e44450a49730a476dad93';
	try {
		const user = await getUser();

		const data = await getAccounts(user?.sub);

		return NextResponse.json(data);
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError(error);
	}
}

export async function POST(request: NextRequest) {
	const user = await getUser();

	try {
		const body = (await request.json()) as Accounts.CreateAccountInput;

		if (!body || !Array.isArray(body)) {
			throw new APIError('bad_request:api', 'Invalid request body.');
		}

		const account = await createAccount(user.sub, body);

		return NextResponse.json(account);
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError(error);
	}
}
