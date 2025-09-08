// @types/documents.d.ts
declare global {
	namespace Documents {
		interface Document {
			id: string;
			userId: string;
			pageContent: string;
			createdAt: string;
			expiresAt?: string;
			lastSyncedAt?: string;
			metadata: Documents.Metadata;
		}
		interface DocumentWithScore extends Documents.Document {
			score: number;
		}
		interface DocumentWithEmbedding extends Documents.Document {
			embedding: Documents.Embedding;
		}
		interface Metadata
			extends Partial<
					Pick<
						Accounts.Transaction,
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
			transactionId?: Accounts.Transaction['id'];
		}
		type Embedding = number[];

		interface CreateDocumentInput extends Documents.Document {
			createdAt?: string;
			embedding?: Documents.Embedding;
		}
	}
}
export {};
