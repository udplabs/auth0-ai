/**
 * POST /api/accounts/transfers
 *
 * Creates (initiates) an internal funds transfer between two customer accounts.
 *
 * High‑level flow:
 * 1. Authenticate current user via Auth0 (server helper getUser()).
 * 2. Parse & validate incoming JSON body (expected shape: Transfers.CreateTransactionInput).
 * 3. Augment payload with derived customerId (user.sub).
 * 4. Persist the transfer (createTransfer) to db.
 * 5. Revalidate cache tag 'accounts' so any account balance UI using fetch/cache is refreshed.
 * 6. Return the new transfer (or transaction) id as JSON.
 *
 * Error handling:
 * - Throws APIError with a consistent JSON shape for known issues (bad body, domain errors).
 * - Unknown errors are wrapped in a generic APIError.
 *
 * Notes / Hardening Ideas (not implemented here):
 * - Add schema validation (e.g., zod) for body before proceeding.
 * - Rate limit or CSRF protection if exposed to browser.
 * - Additional authorization: ensure user owns BOTH source & destination accounts.
 * - Idempotency: accept an Idempotency-Key header to avoid duplicate transfers on retries.
 */

import { createTransfer } from '@/lib/db/queries/accounts/mutate-transactions';
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { getUser } = await import('@/lib/auth0');

		// 1. Auth: fails (throws) if session invalid.
		const user = await getUser();

		// 2. Parse body (ASSUMPTION: client sends valid JSON matching Transfers.CreateTransactionInput).
		//    Consider wrapping in a safeParse with zod for stronger guarantees.
		const body = (await request.json()) as Transfers.CreateTransactionInput;

		if (!body) {
			const { APIError } = await import('@/lib/errors');

			// Defensive: request.json() would normally throw if invalid JSON.
			throw new APIError('bad_request:api', 'Invalid request body.');
		}

		// 3. Derive customer identity (Auth0 subject). Attach so lower layer doesn't trust client.
		const customerId = user.sub;

		// 4. Domain action: create the transfer. Should internally:
		//    - Validate ownership
		//    - Check balances / limits
		//    - Create ledger / transactions atomically
		const transferId = await createTransfer({ ...body, customerId });

		// 5. Invalidate cached account summary data (ISR / fetch cache keyed with tag 'accounts').
		revalidateTag('accounts');

		// 6. Success response: minimal JSON (could wrap in { id: transferId } for extensibility).
		return NextResponse.json(transferId);
	} catch (error: unknown) {
		const { handleApiError } = await import('@/lib/errors');
		return handleApiError(error);
	}
}
