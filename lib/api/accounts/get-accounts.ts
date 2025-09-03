import { getAccountPermissions } from '@/lib/auth0/fga/get-account-permissions';
import { createMockAccounts } from '@/lib/db/mock/mock-accounts';
import { getAccountsByUserId } from '@/lib/db/queries/accounts';

export async function getAccounts(userId: string, includeTransactions = false) {
	console.log('getAccounts called with userId:', userId);
	let data = await getAccountsByUserId(userId, includeTransactions);

	if (data.length === 0) {
		// Did not find data. Create mock data.
		data = await createMockAccounts(userId);
	}

	// We are assuming since the DB returned an account for a given userId
	// That the user has permissions to ACCESS it.
	// But what can they DO with it? 🤔
	return await getAccountPermissions(data);
}
