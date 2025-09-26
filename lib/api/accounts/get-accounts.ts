import { getAccountPermissions } from '@/lib/auth0/fga/get-account-permissions';
import { getAccountsByUserId } from '@/lib/db/queries/accounts/query-accounts';
import { getSettings, upsertSettings } from '@/lib/db/queries/settings';
import { getCacheKey } from '@/lib/utils/get-cache-key';
import { FgaValidationError } from '@openfga/sdk';
import { unstable_cache } from 'next/cache';

import type { Accounts } from '@/types/accounts';

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
	try {
		return await getAccountPermissions(data);
	} catch (error: unknown) {
		const hasFgaClientId = !!process.env?.FGA_CLIENT_ID;
		const settings = await getSettings(userId);

		let labStep = settings?.currentLabStep;
		if (error instanceof FgaValidationError && labStep === 'step-04') {
			// We know user is past step 4
			// Force update to step-5
			labStep = 'step-05';
		} else if (
			error instanceof Error &&
			error.message === 'fga_not_initialized' &&
			hasFgaClientId &&
			labStep === 'step-03'
		) {
			// User should be on step-4 but this means it's not updated yet.
			// Adding FGA Client ID means Step 4 is now complete.
			// Force update to step-5
			labStep = 'step-05';
		}

		await upsertSettings({
			...settings,
			currentLabStep: labStep,
		});
	}

	return [];
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
		[key],
		{ revalidate: 150, tags }
	);

	return cached();
}

export async function listAccounts(userId: string) {
	const accounts = await getAccounts({ userId, includeTransactions: false });

	return accounts.map(({ id, number, displayName, name, type, subType }) => ({
		id,
		displayName,
		name,
		number,
		subType,
		type,
	})) as Accounts.AccountList[];
}
