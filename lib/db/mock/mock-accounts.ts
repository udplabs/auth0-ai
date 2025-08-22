import { createDocuments } from '@/lib/ai/embedding';
import { myProvider } from '@/lib/ai/providers';
import { LocalVectorStore } from '@/lib/ai/rag/vector-store';
import { createOwnerPermissions } from '@/lib/auth0/fga/permissions';
import { saveAccountsAndReturnSeparate } from '@/lib/db/queries/accounts';
import {
	deleteDocuments,
	saveDocuments,
	saveEmbeddings,
} from '@/lib/db/queries/documents';
import { fakerEN as faker } from '@faker-js/faker';
import { embedMany } from 'ai';
import { ulid } from 'ulid';
import { getSampleData } from '../queries/mock';

// Should not be used outside of this function.
const sampleUserIds = [
	'sample|01K22R2CS4VSAP5KKNDY87XC8E',
	'sample|01K22R2CS5VB3C9MYCVPSDDAWT',
	'sample|01K22R2CS5TEFK21AYV2956BGY',
	'sample|01K22R2CS5Y3524ZGSQXPRMZ98',
];

export async function createMockAccounts(userId: string) {
	console.log('Creating mock accounts for user:', userId);

	const sampleUserId = faker.helpers.arrayElement(sampleUserIds);

	const {
		accounts: sampleAccounts = [],
		transactions: sampleTransactions = [],
		documents: sampleDocuments = [],
	} = await getSampleData(sampleUserId);

	const accounts: Accounts.Account[] = [];
	const transactions: Accounts.Transaction[] = [];
	const accountDocuments: Documents.DocumentWithEmbedding[] = [];
	const transactionDocuments: Documents.DocumentWithEmbedding[] = [];

	// Generate new IDs for accounts, transactions, and embeddings
	console.log('Generating mock accounts and transactions...');
	for (const account of sampleAccounts) {
		const originalAccountId = account.id;

		account.id = ulid();
		account.customerId = userId;
		accounts.push(account);

		const documentIndex = sampleDocuments.findIndex(
			(e) => e.id === originalAccountId
		);
		const document = sampleDocuments[documentIndex];

		if (document) {
			document.id = account.id;
			document.metadata.accountId = account.id;
			document.metadata.customerId = userId;
			document.metadata.accountType = account.type;

			document.metadata.createdAt = undefined; // Reset createdAt to avoid conflicts
			document.metadata.updatedAt = undefined; // Reset updatedAt to avoid conflicts

			accountDocuments.push(document);
		} else {
			accountDocuments.push(null as any); // Placeholder for missing document to keep indices aligned
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

			if (transactionDocument) {
				transactionDocument.id = transaction.id;
				transactionDocument.metadata.accountId = account.id;
				transactionDocument.metadata.transactionId = transaction.id;
				transactionDocument.metadata.customerId = userId;

				transactionDocument.metadata.createdAt = undefined; // Reset createdAt to avoid conflicts
				transactionDocument.metadata.updatedAt = undefined; // Reset updatedAt to avoid conflicts

				transactionDocuments.push(transactionDocument);
			} else {
				transactionDocuments.push(null as any); // Placeholder for missing document to keep indices aligned
			}
		}
	}

	console.log('Mock accounts created:', accounts.length);
	console.log('Mock transactions created:', transactions.length);
	console.log('Mock account documents created:', accountDocuments.length);
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
	await saveDocuments([...accountDocuments, ...transactionDocuments]);

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
	for (const sampleUserId of sampleUserIds) {
		console.log('Generating mock embeddings for user:', sampleUserId);

		const {
			accounts = [],
			transactions = [],
			documents: _documents = [],
		} = await getSampleData(sampleUserId);

		// Embeddings should be empty. If not, overwrite it.
		if (_documents.length > 0) {
			await deleteDocuments();
		}
		const docs = await createDocuments(accounts, transactions);
		// Strip pageContent!
		docs.forEach((doc, index) => {
			const parsedData = JSON.parse(doc.pageContent) as
				| Accounts.Account
				| Accounts.Transaction;

			delete (parsedData as any).id;
			delete (parsedData as any).customerId;

			if ((parsedData as Accounts.Transaction).accountId) {
				delete (parsedData as any).accountId;
			}

			docs[index].pageContent = JSON.stringify(parsedData);
		});

		const model = myProvider.textEmbeddingModel('accounts-model');

		const { embeddings } = await embedMany({
			model,
			values: docs.map(({ pageContent }) => pageContent),
		});

		await saveEmbeddings(docs, embeddings, 'sample');
	}
}
