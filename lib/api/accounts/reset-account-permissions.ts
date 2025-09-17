// lib/api/accounts/reset-account-permissions.ts
import {
	createOwnerPermissions,
	deleteAllUserTuples,
} from '@/lib/auth0/fga/utils';
import { getAccountsByUserId } from '@/lib/db/queries/accounts/query-accounts';

export async function resetAccountPermissions(userId: string) {
	// Fetch raw accounts from DB
	// This bypasses the normal getAccounts as we are
	// resetting -- we don't care about current permissions
	const accounts = await getAccountsByUserId(userId);

	// Attempt to delete existing tuples
	await deleteAllUserTuples(userId, accounts);

	// Recreate owner permissions for all accounts
	const accountIds = accounts.map((acc) => acc.id);
	await createOwnerPermissions(userId, accountIds);
}
