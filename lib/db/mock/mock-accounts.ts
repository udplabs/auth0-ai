import { LocalVectorStore } from '@/lib/ai/rag/vector-store';

import type { Accounts } from '@/types/accounts';
import type { Documents } from '@/types/documents';
import type { Transactions } from '@/types/transactions';

// Should not be used outside of this function.
const sampleUserIds = [
	'sample|01K22R2CS4VSAP5KKNDY87XC8E',
	'sample|01K22R2CS5VB3C9MYCVPSDDAWT',
	'sample|01K22R2CS5TEFK21AYV2956BGY',
	'sample|01K22R2CS5Y3524ZGSQXPRMZ98',
];

export async function createMockAccounts(userId: string) {
	console.log('Creating mock accounts for user:', userId);

	const sampleUserId = arrayElement(sampleUserIds);

	const [
		{ getSampleData },
		{ ulid },
		{ createOwnerPermissions },
		{ saveAccountsAndReturnSeparate },
		{ saveDocuments },
	] = await Promise.all([
		import('@/lib/db/queries/mock'),
		import('ulid'),
		import('@/lib/auth0/fga/utils'),
		import('@/lib/db/queries/accounts/mutate-accounts'),
		import('@/lib/db/queries/documents'),
	]);

	const {
		accounts: sampleAccounts = [],
		transactions: sampleTransactions = [],
		documents: sampleDocuments = [],
	} = await getSampleData(sampleUserId);

	const accounts: Accounts.Account[] = [];
	const transactions: Transactions.Transaction[] = [];
	const transactionDocuments: Documents.DocumentWithEmbedding[] = [];

	// Generate new IDs for accounts, transactions, and embeddings
	console.log('Generating mock accounts and transactions...');
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
			const originalTransactionId = transaction.id;
			// Assign new IDs to transactions
			transaction.id = ulid();
			transaction.accountId = account.id;
			transactions.push(transaction);

			const transactionDocumentIndex = sampleDocuments.findIndex(
				(e) => e.id === originalTransactionId
			);
			const transactionDocument = sampleDocuments[transactionDocumentIndex];

			if (transaction?.lastSyncedAt) {
				delete transaction.lastSyncedAt;
			}

			if (transaction?.expiresAt) {
				delete transaction.expiresAt;
			}

			if (transactionDocument) {
				transactionDocument.id = transaction.id;
				transactionDocument.metadata.accountId = account.id;
				transactionDocument.metadata.transactionId = transaction.id;
				transactionDocument.metadata.customerId = userId;

				if (transactionDocument?.lastSyncedAt) {
					delete transactionDocument.lastSyncedAt;
				}

				if (transactionDocument?.expiresAt) {
					delete transactionDocument.expiresAt;
				}

				transactionDocuments.push(transactionDocument);
			} else {
				transactionDocuments.push(null as any); // Placeholder for missing document to keep indices aligned
			}
		}
	}

	console.log('Mock accounts created:', accounts.length);
	console.log('Mock transactions created:', transactions.length);
	console.log(
		'Mock transaction documents created:',
		transactionDocuments.length
	);

	// Save the mock accounts and transactions
	// This is duplicative since createAccounts does this but we need to keep logic separate.
	const { accounts: createdAccounts, transactions: createdTransactions } =
		await saveAccountsAndReturnSeparate(accounts, transactions);

	// Set permissions for the created accounts
	await createOwnerPermissions(
		userId,
		createdAccounts.map((account) => account.id)
	);

	// Save the mock documents
	await saveDocuments([...transactionDocuments]);

	// Initialize (by force) LocalVectorStore with the created accounts and transactions
	await LocalVectorStore.init(true);

	return createdAccounts.map((account) => {
		return {
			...account,
			transactions: createdTransactions.filter(
				(tx) => tx.accountId === account.id
			),
		} as Accounts.Account;
	});
}

// This should be a one-time function but you never know
export async function generateMockEmbeddings() {
	const [
		{ deleteSampleDocuments, getSampleData },
		{ createDocumentsWithEmbeddings },
	] = await Promise.all([
		import('../queries/mock'),
		import('@/lib/ai/rag/create-documents'),
	]);

	for (const sampleUserId of sampleUserIds) {
		console.log('Generating mock embeddings for user:', sampleUserId);

		const { transactions = [], documents: _documents = [] } =
			await getSampleData(sampleUserId);

		// Embeddings should be empty. If not, overwrite it.
		// Deletes ALL sample documents!
		if (_documents.length > 0) {
			await deleteSampleDocuments();
		}

		await createDocumentsWithEmbeddings(transactions, 'sample');
	}
}

function arrayElement<T = string>(array: readonly T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}
