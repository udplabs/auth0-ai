import { createDocumentsWithEmbeddings } from '@/lib/ai/rag/create-documents';
import { createOwnerPermissions } from '@/lib/auth0/fga/permissions';
import { saveAccountsAndReturnSeparate } from '@/lib/db/queries/accounts';

interface CreateAccountsOptions {
	userId: string;
	accounts: Accounts.CreateAccountInput[];
	transactions?: Accounts.Transaction[];
	accountDocuments?: Documents.DocumentWithEmbedding[];
	transactionDocuments?: Documents.DocumentWithEmbedding[];
	createEmbeddings?: boolean;
}

/**
 * Handles account and transaction creation.
 *
 * 1) Save data to DB
 * 2) Write permissions
 * 3) Chunk account data
 * 4) Create embeddings
 *    - This will create/update a vector store with the embeddings
 *    - This will also save the embeddings to the database
 * 5) Return accounts with transactions
 *
 * @param options - The options for creating accounts.
 * @param {string} options.userId - The ID of the user creating the accounts.
 * @param {Accounts.Account[]} options.accounts - The accounts to create.
 * @param {Transaction[]} [options.transactions] - The transactions to create (optional).
 * @returns The created accounts with their transactions.
 */
export async function createAccounts({
	userId,
	accounts,
	transactions = [],
	createEmbeddings = false,
}: CreateAccountsOptions) {
	// 1) Save accounts and transactions to DB
	const { accounts: newAccounts, transactions: newTransactions } =
		await saveAccountsAndReturnSeparate(accounts, transactions);

	// 2) Write permissions
	await createOwnerPermissions(
		userId,
		newAccounts.map((account) => account.id)
	);

	if (createEmbeddings) {
		await createDocumentsWithEmbeddings(newTransactions);
	}

	return newAccounts.map((account) => {
		return {
			...account,
			transactions: newTransactions.filter((tx) => tx.accountId === account.id),
		} as Accounts.Account;
	});
}
