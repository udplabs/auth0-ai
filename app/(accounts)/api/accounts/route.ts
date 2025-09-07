import { createAccounts, getAccounts } from '@/lib/api/accounts';
import { getUser } from '@/lib/auth0';
import { deleteAllUserTuples } from '@/lib/auth0/fga/utils';
import { generateMockEmbeddings } from '@/lib/db/mock/mock-accounts';
import { deleteAccountData } from '@/lib/db/queries/accounts/mutate-accounts';
import { APIError } from '@/lib/errors';
import { type NextRequest, NextResponse } from 'next/server';

// DEVELOPMENT USE ONLY
export async function GET() {
	try {
		const user = await getUser();

		const data = await getAccounts(user?.sub);

		return NextResponse.json(data);
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError(error).toResponse();
	}
}

// DEVELOPMENT USE ONLY

export async function POST(request: NextRequest) {
	const user = await getUser();

	try {
		const body = (await request.json()) as Accounts.CreateAccountInput;

		if (!body || !Array.isArray(body)) {
			throw new APIError('bad_request:api', 'Invalid request body.');
		}

		const userId = user.sub;

		const account = await createAccounts({
			userId,
			accounts: [{ ...body, customerId: userId }],
			createEmbeddings: true,
		});

		await generateMockEmbeddings();

		return NextResponse.json(account);
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError(error).toResponse();
	}
}

/**
 * 1) Removes the user's current account data (including transactions and documents).
 * 2) Regenerates the database sample documents.
 *
 * @param request
 * @returns
 */
export async function DELETE(request: NextRequest) {
	const user = await getUser();

	try {
		const userId = user.sub;

		// Delete all account data for user
		await deleteAccountData(userId);

		// Delete tuples
		await deleteAllUserTuples(userId);

		// Regenerate Sample Data
		await generateMockEmbeddings();

		return new Response(null, { status: 204 });
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError(error).toResponse();
	}
}
