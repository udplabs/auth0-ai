// app/(accounts)/accounts/api/accounts/[id]/route.ts
import { transferFunds } from '@/lib/api/accounts/transfer-funds';
import { APIError, handleApiError } from '@/lib/errors';
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

import type { Transfers } from '@/types/transfers';
/**
 * POST /api/accounts/transfers
 *
 * Creates (initiates) an internal funds transfer between two customer accounts.
 *
 * High‑level flow:
 * 1. Parse & validate incoming JSON body (expected shape: Transfers.CreateTransactionInput).
 * 2. Augment payload with derived customerId (user.sub).
 * 3. Persist the transfer (createTransfer) to db.
 * 4. Revalidate cache tag 'accounts' so any account balance UI using fetch/cache is refreshed.
 * 5. Return the new transfer (or transaction) id as JSON.
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

export async function POST(request: NextRequest) {
	try {
		// 1. Validate JWT
		// 	  - Normally in NextJS app you would not need to validate the JWT.
		//    - Instead you could use the `auth0.getAccessToken()` helper to
		// 	    fetch a token for the currently authenticated user.
		//
		//      See `app/(accounts)/api/accounts/transfers/route.ts` for an example.
		//
		// 	  - For this lab we are simulating an 'external' API that has no user context.
		//    - This also gives us the ability to verify 'user' vs 'agent'.
		//      - In order to create a transfer the 'agent' is required to request a specific audience.
		//      - The audience requested requires user consent -- provided via CIBA.
		//      - If that audience is not present, JWT validation will fail.
		const claims = await verifyJwt(request);

		// 2. Parse body (ASSUMPTION: client sends valid JSON matching Transfers.CreateTransferInput).
		//    Consider wrapping in a safeParse with zod for stronger guarantees.
		const body = (await request.json()) as Transfers.CreateTransferInput;

		if (!body) {
			// Defensive: request.json() would normally throw if invalid JSON.
			throw new APIError('bad_request:api', 'Invalid request body.');
		}

		// 2. Domain action: create the transfer. Should internally:
		//    - Check balances / limits
		//    - Create ledger / transactions atomically
		// const transferId = await createTransfer({ ...body, customerId });
		const result = await transferFunds({ ...body, customerId: claims.sub });

		// 3. Invalidate cached account summary data (ISR / fetch cache keyed with tag 'accounts').
		revalidateTag('accounts');

		// 4. Success response: minimal JSON (could wrap in { id: transferId } for extensibility).
		return NextResponse.json(result);
	} catch (error: unknown) {
		return handleApiError(error);
	}
}

async function verifyJwt(request: NextRequest) {
	const authHeader = request.headers.get('Authorization');
	const [_, accessToken] = authHeader?.split(' ') || [];

	if (!accessToken) {
		throw new APIError('unauthorized:auth', 'Missing access token');
	}

	const issuer = `https://${process.env.AUTH0_DOMAIN}`;
	const JWKS = createRemoteJWKSet(new URL(issuer + '/.well-known/jwks.json'));

	const { payload } = await jwtVerify<JWTPayload & { sub: string }>(
		accessToken,
		JWKS,
		{
			// Auth0 adds `/` to the end of the `iss` claim ¯\_(ツ)_/¯
			issuer: issuer + '/',
			audience: [
				'http://localhost:3000/api/accounts/transfers',
				'https://bronze-ermine-31968.cic-demo-platform.auth0app.com/userinfo',
			], // Normally this would not be hardcoded
			requiredClaims: ['sub'],
		}
	);

	// Verify scopes
	if (!payload?.scope?.includes('create:transfer')) {
		throw new APIError('unauthorized:auth', 'Insufficient scope');
	}

	return payload;
}
