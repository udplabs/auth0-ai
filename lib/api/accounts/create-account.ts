import type { Accounts } from '@/types/accounts';
import type { Transactions } from '@/types/transactions';

interface CreateAccountsOptions {
	userId: string;
	accounts: Accounts.CreateAccountInput[];
	transactions?: Transactions.CreateTransactionInput[];
}

/**
 * Handles account and transaction creation.
 *
 * 1) Save data to DB
 * 2) Write permissions
 * 5) Return accounts with transactions
 *
 * @param options - The options for creating accounts.
 * @param {string} options.userId - The ID of the user creating the accounts.
 * @param {Accounts.Account[]} options.accounts - The accounts to create.
 * @param {Transactions.Transaction[]} [options.transactions] - The transactions to create (optional).
 * @returns The created accounts with their transactions.
 */
export async function createAccounts({
	userId,
	accounts,
	transactions = [],
}: CreateAccountsOptions) {
	const { saveAccountsAndReturnSeparate } = await import(
		'@/lib/db/queries/accounts/mutate-accounts'
	);
	// 1) Save accounts and transactions to DB
	const { accounts: newAccounts, transactions: newTransactions } =
		await saveAccountsAndReturnSeparate(accounts, transactions);

	const { createOwnerPermissions } = await import('@/lib/auth0/fga/utils');
	// 2) Write permissions
	await createOwnerPermissions(
		userId,
		newAccounts.map((account) => account.id)
	);
	return newAccounts.map((account) => {
		return {
			...account,
			transactions: newTransactions.filter((tx) => tx.accountId === account.id),
		} as Accounts.Account;
	});
}
