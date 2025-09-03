// lib/auth0/fga/get-account-permissions.ts
import { getFgaClient } from './client';

const fga = await getFgaClient();

/**
 * getFgaClient, Batch-check permissions for multiple accounts and return accounts
 * with sensitive fields conditionally removed based on permissions.
 *
 * What this does (high level)
 * - Builds a list of "checks" asking FGA: does user:<customerId> have <relation> on account:<id>?
 * - Sends them in a single batch to FGA (one network round trip).
 * - Collects which relations were allowed per account.
 * - Returns the original accounts, attaching a `permissions` array, and
 *   strips sensitive fields if "can_view_balances" was NOT granted.
 *
 * Lab exercise (step-by-step to implement)
 * 0) Guard: if no FGA client or no accounts, return early.
 * 1) Define the relations we care about (e.g., can_view_balances, can_view_transactions, can_transfer).
 * 2) Build the `checks` array:
 *    - For each account, for each relation, create:
 *      { user: `user:${customerId}`, relation, object: `account:${id}` }
 * 3) Call `fga.batchCheck({ checks })` and read the `result` array.
 * 4) Create a map of granted permissions per account:
 *    - For each result item where allowed === true:
 *      - Parse the accountId from request.object (format: "account:<id>")
 *      - Push the relation name into granted[accountId]
 * 5) Build the output accounts:
 *    - Copy each account and attach `permissions: granted[account.id] || []`
 *    - If permissions DOES NOT include "can_view_balances", delete sensitive fields:
 *      balance, availableBalance, originalPrincipal, currentPrincipal, statementBalance, cashBalance
 * 6) Return the new accounts array.
 *
 * Notes (for the lab)
 * - The object string is "account:<id>". A simple `split(':')[1]` is fine here.
 * - We’re keeping this intentionally simple: no chunking, no retries, no advanced error handling.
 * - Console logs are okay in the lab to visualize what’s happening.
 *
 * @param accounts Array of account objects. Each should include `id` and `customerId`.
 * @returns Accounts with a `permissions` array and possibly fewer fields if not allowed.
 * @throws Error if the FGA client is not initialized.
 */
export async function getAccountPermissions(accounts: Accounts.Account[]) {
	if (!fga) throw new Error('FGA Client not initialized!');

	// STEP 1: Pick the relations to check (must match your FGA model).
	const RELATIONS: Accounts.AccountPermissions[] = [
		'can_view_balances',
		'can_view_transactions',
		'can_transfer',
	];

	// STEP 2: Build the batch of checks (user, relation, object).
	// Ask: “Does user:<customerId> have <relation> on account:<id>?”
	const checks = accounts.flatMap(({ id, customerId }) => {
		return RELATIONS.map((relation) => ({
			user: `user:${customerId}`,
			relation,
			object: `account:${id}`,
		}));
	});

	// STEP 3: Call FGA once with all checks. `result` tells us which were allowed.
	const { result } = await fga.batchCheck({ checks });

	// STEP 4: Collect allowed relations per account id.
	// Initialize a simple map: accountId -> string[]
	const granted: Record<string, Accounts.AccountPermissions[]> = {};
	for (const a of accounts) granted[a.id] = [];

	for (const { allowed, request } of result) {
		if (!allowed) continue;

		// request.object comes back like "account:<id>"
		// Simple parse for the lab (first colon split is fine here).
		const accountId = request.object.split(':')[1] ?? request.object;

		// Record the granted relation for this account.
		granted[accountId]?.push(request.relation as Accounts.AccountPermissions);
	}

	// STEP 5: Build the final accounts array.
	// Attach `permissions`, and strip sensitive fields if "can_view_balances" is NOT present.
	const output: Accounts.Account[] = accounts.map((account) => {
		const permissions = granted[account.id] ?? [];

		// Shallow copy so we don’t mutate the original.
		const copy: any = { ...account, permissions };

		// Remove sensitive fields unless user can view balances.
		if (!permissions.includes('can_view_balances')) {
			delete copy.balance;
			delete copy.availableBalance;
			delete copy.originalPrincipal;
			delete copy.currentPrincipal;
			delete copy.statementBalance;
			delete copy.cashBalance;
		}

		// Helpful in the lab to see what was granted.
		console.log('Account Permissions:', permissions);

		return copy as Accounts.Account;
	});

	// STEP 6: Return the new list.
	return output;
}
