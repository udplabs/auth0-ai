declare global {
	namespace Documents {
		interface Document {
			id: string;
			pageContent: string;
			createdAt: string;
			updatedAt: string;
			metadata: Documents.Metadata;
		}
		interface DocumentWithScore extends Documents.Document {
			score: number;
		}
		interface DocumentWithEmbedding extends Documents.Document {
			embedding: Documents.Embedding;
		}
		interface Metadata extends Record<string, unknown> {
			accountId?: string;
			transactionId?: string;
			accountType?: string;
			customerId?: string;
			modelId?: string;
		}
		type Embedding = number[];

		interface CreateDocumentInput extends Documents.Document {
			createdAt?: string;
			updatedAt?: string;
			embedding?: Documents.Embedding;
		}
	}
}
export {};
