// lib/ai/rag/create-documents.ts
import { openai } from '@/lib/ai/openai';
import { saveEmbeddings } from '@/lib/db/queries/documents';
import { embedMany } from 'ai';

export async function createDocumentsWithEmbeddings(
	transactions: Accounts.Transaction[],
	table: 'sample' | 'dev' = 'dev'
): Promise<Documents.DocumentWithEmbedding[]> {
	console.log('creating documents...');
	console.log('transactions: ', transactions.length);

	const docs: Documents.CreateDocumentInput[] = [];

	// Create documents for transactions
	for (const transaction of transactions) {
		docs.push(buildEmbeddingDoc(transaction));
	}

	if (docs.length === 0) {
		// Nothing to do. Return empty array.
		return docs as Documents.DocumentWithEmbedding[];
	}

	// Create embeddings for all chunks
	const { embeddings } = await embedMany({
		model: openai.textEmbedding('text-embedding-3-small'),
		values: docs.map(({ pageContent }) => pageContent),
	});

	console.log(`Created ${embeddings.length} embeddings.`);

	// Persist to database to be retrieved by LocalVectorStore (in-memory) in the future
	// This is not a scalable model and for demo purposes only!
	return await saveEmbeddings(docs, embeddings, table);
}

function buildEmbeddingDoc(tx: Accounts.Transaction) {
	return {
		id: tx.id,
		pageContent: mkSearchText(tx),
		userId: tx.customerId,
		metadata: {
			accountId: tx.accountId,
			transactionId: tx.id,
			date: tx.date,
			amount: tx.amount,
			type: tx.type,
			categoryId: tx.categoryId,
			categoryName: tx.categoryName,
			budgetCategory: tx.budgetCategory,
			budgetSubcategory: tx.budgetSubcategory,
			payee: normalizePayee(tx.payee),
			isExternal: !!tx.isExternal,
			externalConnectionId: tx.externalConnectionId,
			externalConnectionName: tx.externalConnectionName,
			currencyCode: tx.currencyCode,
		},
	};
}

function normalizePayee(s: string) {
	return s
		.toLowerCase()
		.replace(/\s+/g, ' ')
		.replace(/[#-]?\d{3,}$/g, '') // strip trailing store/ids
		.replace(/\b(pos|purchase|debit|visa|auth|card)\b/g, '')
		.trim();
}

function mkSearchText(tx: Accounts.Transaction) {
	const parts = [
		tx.payee,
		tx.description,
		tx.categoryName,
		tx.budgetCategory,
		tx.budgetSubcategory,
		tx.memo ?? '',
		(tx.tags ?? []).join(' '),
	];
	return parts.filter(Boolean).join(' • ');
}
