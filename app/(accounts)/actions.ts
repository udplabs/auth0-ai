'use server';

import { createMockAccounts } from '@/lib/db/mock/mock-accounts';
import { getAccountsByUserId } from '@/lib/db/queries/accounts';
import {
	getTransactionsByAccountId,
	getTransactionsByUserId,
} from '@/lib/db/queries/transactions';
import { createAccounts } from '@/lib/db/services/accounts';

export async function getAccounts(userId: string) {
	console.log('getAccounts called with userId:', userId);
	let data = await getAccountsByUserId(userId);

	if (data.length === 0) {
		// Did not find data. Create mock data.
		data = await createMockAccounts(userId);
	}

	return data;
}

export async function getTransactions({
	accountId,
	userId,
}: {
	accountId?: string;
	userId?: string;
}) {
	if (accountId) {
		return await getTransactionsByAccountId(accountId);
	}
	if (userId) {
		return await getTransactionsByUserId(userId);
	}

	return [];
}

export async function createAccount(
	userId: string,
	account: Accounts.CreateAccountInput
) {
	await createAccounts({
		userId,
		accounts: [{ ...account, customerId: userId }],
		createEmbeddings: true,
	});
}
