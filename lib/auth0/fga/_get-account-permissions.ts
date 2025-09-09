// lib/auth0/fga/get-account-permissions.ts
// FINAL CODE
import { getFgaClient } from './client';

const fga = await getFgaClient();

// Lab helper.
// If you are seeing this in the console,
// you did the previous work correctly!
if (fga) {
	console.log('Success! FGA client initialized.');
}

/**
 * Lab Exercise: Implement `getAccountPermissions`
 *
 * What you will build
 * - A function to batch-check permissions for multiple accounts using OpenFGA.
 * - Conditionally remove sensitive fields from accounts based on permissions.
 *
 * What this does (high level)
 * - Builds a list of "checks" asking FGA: does user:<customerId> have <relation> on account:<id>?
 * - Sends them in a single batch to FGA (one network round trip).
 * - Collects which relations were allowed per account.
 * - Returns the original accounts, attaching a `permissions` array, and
 *   strips sensitive fields (i.e. if "can_view_balances" was NOT granted).
 *
 * Why
 * - To ensure that users and AGENTS only see the data they are permitted to access.
 * - To minimize the risk of exposing sensitive information.
 *
 * ---------------------------------------------------------------------------
 *
 * 1) Guard: if no FGA client or no accounts, return early.
 * 2) Define the relations we care about (e.g., can_view_balances, can_view_transactions, can_transfer).
 * 3) Build the `checks` array:
 *    - For each account, for each relation, create:
 *      { user: `user:${customerId}`, relation, object: `account:${id}` }
 * 4) Call `fga.batchCheck({ checks })` and read the `result` array.
 * 5) Create a map of granted permissions per account:
 *    - For each result item where allowed === true:
 *      - Parse the accountId from request.object (format: "account:<id>")
 *      - Push the relation name into granted[accountId]
 * 6) Build the output accounts:
 *    - Copy each account and attach `permissions: granted[account.id] || []`
 *    - If permissions DOES NOT include "can_view_balances", delete sensitive fields:
 *      balance, availableBalance, originalPrincipal, currentPrincipal, statementBalance, cashBalance
 * 7) Return the new accounts array.
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
	// ---------------------------------------------------------------------------
	// ✅ STEP 1: Guard! Soft fail if client is not initialized.
	//
	// THIS IS NOT HOW YOU WOULD DO IT IN PRODUCTION
	// ---------------------------------------------------------------------------
	if (!fga) {
		console.warn('FGA client not initialized!');
		return [];
	}

	// ---------------------------------------------------------------------------
	// ❌ STEP 2: Define the relations to check for. (must match your FGA model).
	// ---------------------------------------------------------------------------
	const RELATIONS: Accounts.AccountPermissions[] = [
		'can_view',
		'can_view_balances',
		'can_view_transactions',
		'can_transfer',
	];

	// ---------------------------------------------------------------------------
	// ❌ STEP 3: Build the batch checks.
	// Ask: “Does user:<customerId> have <relation> on account:<id>?”
	// ---------------------------------------------------------------------------
	const checks = accounts.flatMap(({ id, customerId }) => {
		return RELATIONS.map((relation) => ({
			user: `user:${customerId}`,
			relation,
			object: `account:${id}`,
		}));
	});

	// ---------------------------------------------------------------------------
	// ✅ STEP 4: Call FGA once with all checks.
	//
	// This sends a single request to the FGA API with all the checks.
	const { result } = await fga.batchCheck({ checks });

	// ---------------------------------------------------------------------------
	// ✅ STEP 5: Collect allowed relations per account id.
	// Initialize a simple map: accountId -> string[]
	// ---------------------------------------------------------------------------
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

	// ---------------------------------------------------------------------------
	// ❌ STEP 6: Build the final accounts array. (rudimentary implementation)
	//
	// 1. Map through all the accounts
	// 2. Check what permissions exist for that account (what FGA returned)
	// 3. Handle the data/response based on the permission.
	// ---------------------------------------------------------------------------
	const output: (Accounts.Account | null)[] = accounts.map((account) => {
		const permissions = granted[account.id] ?? [];

		if (!permissions.includes('can_view')) {
			return null;
		}
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

		if (
			copy?.transactions?.length &&
			!permissions.includes('can_view_transactions')
		) {
			delete copy.transactions;
		}

		// Helpful in the lab to see what was granted.
		console.log('Account Permissions:', permissions);

		return copy as Accounts.Account;
	});

	// ---------------------------------------------------------------------------
	// ✅ STEP 7: Return the modified response.
	// ---------------------------------------------------------------------------
	return output.filter((a) => a !== null) as Accounts.Account[];
}
