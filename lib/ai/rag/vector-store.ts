import { getAllTransactions } from '@/lib/db/queries/accounts';
import { getDocuments } from '@/lib/db/queries/documents';
import { openai } from '@ai-sdk/openai';
import { cosineSimilarity, embed } from 'ai';
import { createDocumentsWithEmbeddings } from './create-documents';

export class LocalVectorStore {
	private static db: Documents.DocumentWithEmbedding[] = [];
	static initialized = false;

	static count = LocalVectorStore.db.length;

	static summary() {
		console.log('LocalVectorStore summary:');
		console.log('Total documents:', LocalVectorStore.db.length);
	}

	static reset() {
		console.log('resetting vector store!');
		LocalVectorStore.db = [];
		LocalVectorStore.initialized = false;
		console.log('Vector store reset.');
	}
	static async init(force = false) {
		console.log(
			'LocalVectorStore initialized:',
			LocalVectorStore.initialized,
			'Force re-initialize?:',
			force
		);

		if (!force && LocalVectorStore.initialized) {
			console.log('Vector store already initialized, skipping...');
			return;
		}

		console.log('checking for existing documents with embeddings...');
		// check for existing documents so we don't recreate unnecessarily.
		const existingDocuments = await getDocuments('dev');

		console.log('existing documents:', existingDocuments.length);

		if (existingDocuments.length > 0) {
			console.log(
				`adding ${existingDocuments.length} existing documents to vector store...`
			);
			await LocalVectorStore.insert(existingDocuments);
		}

		console.log('attempting to initialize entire db...');
		// Store has not yet been initialized.
		// Attempt to initialize the entire DB

		const existingTransactionIds = existingDocuments.flatMap(
			(doc) => doc.metadata?.transactionId || []
		);

		// 1) Fetch transactions from DB that do not yet have embeddings
		const transactionsWithoutEmbedding = await getAllTransactions({
			NOT: { id: { in: existingTransactionIds } },
		});
		console.log(
			'transactions missing embeddings:',
			transactionsWithoutEmbedding.length
		);

		if (transactionsWithoutEmbedding.length > 0) {
			console.log('Creating documents for new transactions...');
			const docs = await createDocumentsWithEmbeddings(
				transactionsWithoutEmbedding
			);

			if (docs.length > 0) {
				await LocalVectorStore.insert(docs);
			}
		}

		LocalVectorStore.initialized = true;
		console.log('LocalVectorStore initialized successfully.');
	}
	static async insert(documents: Documents.DocumentWithEmbedding[]) {
		if (LocalVectorStore.db.length > 0) {
			console.log('DB already has documents, merging new ones...');
			for (const document of documents) {
				const idx = LocalVectorStore.db.findIndex((d) => d.id === document.id);
				if (idx !== -1) {
					console.log('Updating existing document:', document.id);
					LocalVectorStore.db[idx] = document;
				} else {
					console.log(
						'Existing document not found, adding new one:',
						document.id
					);
					LocalVectorStore.db.push(document);
				}
			}
		} else {
			console.log('DB is empty, adding all documents:', documents.length);
			LocalVectorStore.db.push(...documents);
		}
	}

	static async search(query: string, limit = 999) {
		const model = openai.textEmbedding('text-embedding-3-small');
		const { embedding: q } = await embed({
			model,
			value: query,
		});
		const results = LocalVectorStore.db
			.map(({ embedding, ...doc }) => {
				const score = cosineSimilarity(q, embedding);
				return { ...doc, score } as Documents.DocumentWithScore;
			})
			.sort((a, b) => b.score - a.score)
			.slice(0, limit);

		console.log('search results found:', results.length);
		return results;
	}
}
