import { saveEmbeddings } from '@/lib/db/queries/documents';
import { embedMany } from 'ai';
import { myProvider } from './providers';

export async function createAccountEmbeddings(docs: Documents.Document[]) {
	console.log('Creating account embeddings...');
	// Create embeddings for each account and it's transactions.

	const model = myProvider.textEmbeddingModel('accounts-model');

	// Create embeddings for all chunks
	const { embeddings } = await embedMany({
		model,
		values: docs.map(({ pageContent }) => pageContent),
	});

	console.log(`Created ${embeddings.length} embeddings.`);

	// Persist to database to be retrieved by LocalVectorStore (in-memory) in the future
	// This is not a scalable model and for demo purposes only!
	const result = await saveEmbeddings(docs, embeddings);

	return result;
}

export async function createDocuments(
	accounts: Accounts.Account[] | Accounts.AccountWithoutTransactions[],
	transactions: Accounts.Transaction[]
) {
	console.log('creating documents...');
	console.log(
		'accounts: ',
		accounts.length,
		'transactions: ',
		transactions.length
	);

	const docs: Documents.Document[] = [];

	// Create documents for accounts
	for (const account of accounts) {
		docs.push({
			id: account.id,
			pageContent: JSON.stringify(account),
			metadata: {
				accountId: account.id,
				accountType: account.type,
				customerId: account.customerId,
			},
		});
	}

	// Create documents for transactions
	for (const transaction of transactions) {
		docs.push({
			id: transaction.id,
			pageContent: JSON.stringify(transaction),
			metadata: {
				accountId: transaction.accountId,
				transactionId: transaction.id,
				customerId: transaction.customerId,
			},
		});
	}

	return docs;
}
