import type { Accounts } from '@/types/accounts';
import type { Transactions } from '@/types/transactions';

// Should not be used outside of this function.
const sampleUserIds = [
	'sample|01K22R2CS4VSAP5KKNDY87XC8E',
	'sample|01K22R2CS5VB3C9MYCVPSDDAWT',
	'sample|01K22R2CS5TEFK21AYV2956BGY',
	'sample|01K22R2CS5Y3524ZGSQXPRMZ98',
];

export async function createMockAccounts(userId: string) {
	console.info('Creating mock accounts for user:', userId);

	const sampleUserId = arrayElement(sampleUserIds);

	const [
		{ getSampleData },
		{ ulid },
		{ createOwnerPermissions },
		{ saveAccountsAndTransactions },
	] = await Promise.all([
		import('@/lib/db/queries/mock'),
		import('ulid'),
		import('@/lib/auth0/fga/utils'),
		import('@/lib/db/queries/accounts/mutate-accounts'),
	]);

	const {
		accounts: sampleAccounts = [],
		transactions: sampleTransactions = [],
	} = await getSampleData(sampleUserId);

	const accounts: Accounts.AccountWithoutTransactions[] = [];
	const transactions: Transactions.Transaction[] = [];

	// Generate new IDs for accounts, transactions, and embeddings
	console.info('Generating mock accounts and transactions...');
	for (const account of sampleAccounts) {
		const originalAccountId = account.id;

		account.id = ulid();
		account.customerId = userId;
		accounts.push(account);

		if (account?.lastSyncedAt) {
			delete account.lastSyncedAt;
		}

		if (account?.expiresAt) {
			delete account.expiresAt;
		}

		// Filter transactions for this account and assign new IDs
		const accountTransactions = sampleTransactions.filter(
			(tx) => tx.accountId === originalAccountId
		);

		for (const transaction of accountTransactions) {
			// Assign new IDs to transactions
			transaction.id = ulid();
			transaction.accountId = account.id;
			transactions.push(transaction);

			if (transaction?.lastSyncedAt) {
				delete transaction.lastSyncedAt;
			}

			if (transaction?.expiresAt) {
				delete transaction.expiresAt;
			}
		}
	}

	console.info('Mock accounts created:', accounts.length);
	console.info('Mock transactions created:', transactions.length);

	// Save the mock accounts and transactions
	// This is duplicative since createAccounts does this but we need to keep logic separate.
	const { accounts: createdAccounts, transactions: createdTransactions } =
		await saveAccountsAndTransactions(accounts, transactions);

	// Set permissions for the created accounts
	await createOwnerPermissions(
		userId,
		createdAccounts.map((account) => account.id)
	);
	return createdAccounts.map((account) => {
		return {
			...account,
			transactions: createdTransactions.filter(
				(tx) => tx.accountId === account.id
			),
		} as Accounts.Account;
	});
}

function arrayElement<T = string>(array: readonly T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}
