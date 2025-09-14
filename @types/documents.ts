// @types/documents.ts
import { Transactions } from './transactions';
export namespace Documents {
	export interface Document {
		id: string;
		userId: string;
		pageContent: string;
		createdAt: string;
		expiresAt?: string;
		lastSyncedAt?: string;
		metadata: Metadata;
	}
	export interface DocumentWithScore extends Documents.Document {
		score: number;
	}
	export interface DocumentWithEmbedding extends Documents.Document {
		embedding: Documents.Embedding;
	}
	interface Metadata
		extends Partial<
				Pick<
					Transactions.Transaction,
					| 'accountId'
					| 'date'
					| 'amount'
					| 'type'
					| 'categoryId'
					| 'categoryName'
					| 'budgetCategory'
					| 'budgetSubcategory'
					| 'payee'
					| 'isExternal'
					| 'externalConnectionId'
					| 'externalConnectionName'
					| 'currencyCode'
				>
			>,
			Record<string, unknown> {
		accountType?: string;
		modelId?: string;
		transactionId?: Transactions.Transaction['id'];
	}
	export type Embedding = number[];

	export interface CreateDocumentInput
		extends Omit<Documents.Document, 'createdAt'> {
		createdAt?: string;
		embedding?: Documents.Embedding;
	}
}
