// lib/ai/rag/create-documents.ts
import { openai } from '@/lib/ai/model/openai';
import { saveEmbeddings } from '@/lib/db/queries/documents';
import type { Documents } from '@/types/documents';
import type { Transactions } from '@/types/transactions';
import { embedMany } from 'ai';

export async function createDocumentsWithEmbeddings(
	transactions: Transactions.Transaction[],
	table: 'sample' | 'dev' = 'dev'
): Promise<Documents.DocumentWithEmbedding[]> {
	console.info('creating documents...');
	console.info('transactions: ', transactions.length);

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

	console.info(`Created ${embeddings.length} embeddings.`);

	// Persist to database to be retrieved by LocalVectorStore (in-memory) in the future
	// This is not a scalable model and for demo purposes only!
	return await saveEmbeddings(docs, embeddings, table);
}

function buildEmbeddingDoc(tx: Transactions.Transaction) {
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
			rawPayee: tx.rawPayee,
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

function mkSearchText(tx: Transactions.Transaction) {
	const parts = [
		tx.payee,
		tx.rawPayee,
		tx.budgetCategory ?? tx.categoryName,
		tx.budgetSubcategory ?? '',
		tx.memo ?? '',
		(tx.tags ?? []).join(' '),
	];
	return parts.filter(Boolean).join(' • ');
}
