import { createOwnerPermissions } from '@/lib/auth0/fga/utils';
import { getAccounts } from './get-accounts';

export async function resetAccountPermissions(userId: string) {
	// Fetch accounts to ensure permissions are recalculated
	const accounts = await getAccounts(userId);

	// Recreate owner permissions for all accounts
	const accountIds = accounts.map((acc) => acc.id);
	await createOwnerPermissions(userId, accountIds);
}
