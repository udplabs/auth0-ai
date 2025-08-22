import { myProvider } from '@/lib/ai/providers';
import { getAllAccounts } from '@/lib/db/queries/accounts';
import { getDocuments } from '@/lib/db/queries/documents';
import { getAllTransactions } from '@/lib/db/queries/transactions';
import { cosineSimilarity, embed } from 'ai';
import { createAccountEmbeddings, createDocuments } from '../embedding';

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

		const existingAccountIds = existingDocuments.flatMap(
			(doc) => doc.metadata?.accountId || []
		);
		const existingTransactionIds = existingDocuments.flatMap(
			(doc) => doc.metadata?.transactionId || []
		);

		// 1) Fetch accounts from DB that do not yet have embeddings
		const accountsWithoutEmbedding = await getAllAccounts({
			NOT: { id: { in: existingAccountIds } },
		});

		console.log('accounts missing embedding:', accountsWithoutEmbedding.length);

		// 2) Fetch transactions from DB that do not yet have embeddings
		const transactionsWithoutEmbedding = await getAllTransactions({
			NOT: { id: { in: existingTransactionIds } },
		});
		console.log(
			'transactions missing embeddings:',
			transactionsWithoutEmbedding.length
		);

		if (
			accountsWithoutEmbedding.length > 0 ||
			transactionsWithoutEmbedding.length > 0
		) {
			console.log('Creating documents for new accounts and transactions...');
			const docs = await createDocuments(
				accountsWithoutEmbedding,
				transactionsWithoutEmbedding
			);

			if (docs.length > 0) {
				console.log('creating embeddings for new documents:', docs.length);

				const result = await createAccountEmbeddings(docs);

				await LocalVectorStore.insert(result);
			} else {
				console.log('No new documents to create embeddings for.');
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
		const model = myProvider.textEmbeddingModel('accounts-model');
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
