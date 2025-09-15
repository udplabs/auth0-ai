// app/(accounts)/api/accounts/route.ts
import { getAccounts } from '@/lib/api/accounts/get-accounts';
import { getUser } from '@/lib/auth0/client';
import { deleteAllUserTuples } from '@/lib/auth0/fga/utils';
import { generateMockEmbeddings } from '@/lib/db/mock/mock-accounts';
import { deleteAccountData } from '@/lib/db/queries/accounts/mutate-accounts';
import { handleApiError } from '@/lib/errors';
import { type NextRequest, NextResponse } from 'next/server';
/**
 * Accounts API
 *
 * Route: /api/accounts
 * Methods:
 *   GET    → Return the authenticated user's account portfolio (and derived balances).
 *   DELETE → Reset the authenticated user's account data (dangerous: destructive). Development only!
 *
 * SECURITY / SCOPE
 * - Auth required (getUser()). If unauthenticated, getUser() should throw (caught below).
 * - All operations are strictly scoped to the caller's own userId (Auth0 `sub`).
 *
 * WHY A FULL RESET (DELETE)?
 * - Lab convenience: lets a developer wipe existing mock data and re‑seed consistent sample
 *   accounts + transactions + embeddings + FGA tuples in one step.
 * - NOT a pattern for production without strong confirmation / authorization.
 *
 * SIDE EFFECTS (DELETE):
 * 1. deleteAccountData(userId)      → removes accounts, transactions, related documents from db.
 * 2. deleteAllUserTuples(userId)    → purges FGA tuples for this user.
 * 3. generateMockEmbeddings()       → repopulates vector store + sample domain data.
 *
 * ERROR HANDLING
 * - Known domain / validation errors throw APIError → converted to structured response.
 * - Unknown errors are wrapped in a generic APIError (avoid leaking internals).
 *
 * IMPROVEMENT IDEAS (not implemented here):
 * - Rate limiting / abuse protection (DELETE especially).
 * - Idempotency key or background job for large dataset resets.
 * - Return a status object after DELETE (counts of deleted / recreated resources) instead of 204.
 * - Add ETag / caching for GET if account data stable, plus revalidation on mutations.
 */

// -----------------------------------------------------------------------------
// GET /api/accounts
// Returns the current user's accounts (and any aggregated metadata provided by getAccounts).
// -----------------------------------------------------------------------------
export async function GET() {
	try {
		const user = await getUser(); // Throws if not authenticated
		const data = await getAccounts(user.sub);

		// Success: return JSON array (shape defined by getAccounts implementation)
		return NextResponse.json(data);
	} catch (error: unknown) {
		return handleApiError(error);
	}
}

/**
 * DELETE /api/accounts
 *
 * Destructive reset for the authenticated user's financial data + authorization state.
 *
 * Response:
 *   204 No Content on success (intentionally minimal to discourage casual invocation in prod).
 *
 * WARNING:
 * - This endpoint deletes user-specific data and FGA tuples before recreating mock artifacts.
 * - Keep server-only; do NOT expose in a public UI without confirmation safeguards.
 *
 * Possible Enhancements:
 * - Return a JSON summary (e.g., { deletedAccounts, deletedTransactions, regeneratedDocuments }).
 * - Require a confirmation token/header (e.g. X-Confirm-Reset: true).
 * - Wrap each phase in try/catch and partial rollback if necessary (here we rely on idempotent regeneration).
 */
export async function DELETE(_request: NextRequest) {
	try {
		const user = await getUser(); // Resolve early; fail fast if no auth

		const userId = user.sub;

		// 1. Remove all local domain data
		await deleteAccountData(userId);

		// 2. Purge authorization tuples for user (removes grants/ownership)
		await deleteAllUserTuples(userId);

		// 3. Recreate mock data + embeddings (vector store & sample documents)
		await generateMockEmbeddings();

		// 204: success, intentionally no body
		return new Response(null, { status: 204 });
	} catch (error: unknown) {
		return handleApiError(error);
	}
}
