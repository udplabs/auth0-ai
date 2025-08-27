import { saveEmbeddings } from '@/lib/db/queries/documents';
import { openai } from '@ai-sdk/openai';
import { embedMany } from 'ai';

export async function createDocumentsWithEmbeddings(
	transactions: Accounts.Transaction[]
): Promise<Documents.DocumentWithEmbedding[]> {
	console.log('creating documents...');
	console.log('transactions: ', transactions.length);

	const docs: Documents.CreateDocumentInput[] = [];

	// Create documents for transactions
	for (const transaction of transactions) {
		const { payee, rawPayee, description, memo, tags } = transaction;
		docs.push({
			id: transaction.id,
			pageContent: JSON.stringify({ payee, rawPayee, description, memo, tags }),
			metadata: {
				accountId: transaction.accountId,
				transactionId: transaction.id,
				customerId: transaction.customerId,
			},
		});
	}

	if (docs.length === 0) {
		// Nothing to do. Return empty array.
		return docs as Documents.DocumentWithEmbedding[];
	}

	console.log('Creating account embeddings...');
	// Create embeddings for each transactions.

	// Create embeddings for all chunks
	const { embeddings } = await embedMany({
		model: openai.textEmbedding('text-embedding-3-small'),
		values: docs.map(({ pageContent }) => pageContent),
	});

	console.log(`Created ${embeddings.length} embeddings.`);

	// Persist to database to be retrieved by LocalVectorStore (in-memory) in the future
	// This is not a scalable model and for demo purposes only!
	return await saveEmbeddings(docs, embeddings);
}
