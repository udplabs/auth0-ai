import { getAccountPermissions } from '@/lib/auth0/fga/get-account-permissions';
import { getAccountsByUserId } from '@/lib/db/queries/accounts/query-accounts';
import { getCacheKey } from '@/lib/utils/get-cache-key';
import { unstable_cache } from 'next/cache';

interface GetAccountsOptions extends ActionOptions {
	includeTransactions?: boolean;
}

async function fetchAccounts(userId: string, includeTransactions = false) {
	let data = await getAccountsByUserId(userId, includeTransactions);

	if (data.length === 0) {
		const { createMockAccounts } = await import('@/lib/db/mock/mock-accounts');
		// Did not find data. Create mock data.
		data = await createMockAccounts(userId);
	}

	// We are assuming since the DB returned an account for a given userId
	// That the user has permissions to ACCESS it.
	// But what can they DO with it? 🤔
	return await getAccountPermissions(data);
}
export async function getAccounts({
	userId,
	includeTransactions,
	key,
	tags,
}: GetAccountsOptions) {
	if (!key) {
		key = getCacheKey({ userId, resource: ['accounts'] });
	}

	if (!tags || tags.length === 0) {
		tags = [key, 'accounts'];
	}

	tags = [...new Set(tags)];

	const cached = unstable_cache(
		() => fetchAccounts(userId, includeTransactions),
		tags,
		{ revalidate: 150, tags }
	);

	return cached();
}
