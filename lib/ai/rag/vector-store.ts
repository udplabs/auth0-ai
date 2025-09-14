import { openai } from '@/lib/ai/openai';
import { getAllTransactions } from '@/lib/db/queries/accounts';
import { getDocuments } from '@/lib/db/queries/documents';
import { cosineSimilarity, embed } from 'ai';
import { createDocumentsWithEmbeddings } from './create-documents';

import type { Documents } from '@/types';
/**
 * LocalVectorStore
 *
 * An in‑memory (per server process) vector store used for lab / dev scenarios.
 * Responsibilities:
 *  - Bootstrap embeddings for existing transaction documents.
 *  - Incrementally add embeddings for new transactions lacking vectors.
 *  - Provide cosine similarity search over stored embeddings.
 *
 * NOT production‑grade:
 *  - Data is lost on process restart (no persistence layer).
 *  - No sharding / concurrency control.
 *  - No embedding versioning or dimensionality validation.
 *
 * Data Model (in memory):
 *  - db: Documents.DocumentWithEmbedding[] (each item: { id, text, metadata, embedding })
 *  - search() returns Documents.DocumentWithScore[] (embedding removed, plus score).
 *
 * Initialization Flow (init()):
 *  1. (Optional) Early exit if already initialized and !force.
 *  2. Load existing embedded documents from DB (getDocuments) and add to memory.
 *  3. Determine which transactions lack embeddings (exclude existing doc ids).
 *  4. Create embeddings for missing transactions (createDocumentsWithEmbeddings).
 *  5. Insert new embedded docs and mark initialized.
 *
 * Typical Usage:
 *  await LocalVectorStore.init();     // warm start (idempotent)
 *  const results = await LocalVectorStore.search("coffee transactions last week");
 *
 * Force Rebuild:
 *  await LocalVectorStore.init(true); // clears + rebuilds (if reset not manually called)
 *
 * Dev Utilities:
 *  - summary(): logs total doc count.
 *  - reset(): clears memory & initialized flag.
 *
 * Potential Enhancements (not implemented):
 *  - Persist to SQLite / Postgres table (id, vector as blob/array, metadata JSON).
 *  - Add approximate nearest neighbor (e.g., HNSW) for scalability.
 *  - Track embedding model version & re‑embed on mismatch.
 *  - Add write batching & debounced flush.
 *  - Allow filter predicates (e.g., by accountId) pre‑scoring.
 */

export class LocalVectorStore {
	/**
	 * In‑memory array of documents holding embeddings.
	 * NOTE: Never export directly; mutability is controlled via insert/reset.
	 */
	private static db: Documents.DocumentWithEmbedding[] = [];

	/**
	 * Indicates whether initialization has completed at least once
	 * (does not guarantee embeddings exist for ALL current transactions).
	 */
	static initialized = false;

	/** Current document count in memory. */
	static get count() {
		return LocalVectorStore.db.length;
	}

	/** Log a lightweight summary (dev aid). */
	static summary() {
		console.log('LocalVectorStore summary:');
		console.log('Total documents:', LocalVectorStore.count);
	}

	/**
	 * Reset the in-memory store (destructive).
	 * Use sparingly—intended for dev / admin endpoints.
	 */
	static reset() {
		console.log('resetting vector store!');
		LocalVectorStore.db = [];
		LocalVectorStore.initialized = false;
		console.log('Vector store reset.');
	}

	/**
	 * Initialize (or re‑initialize) the vector store.
	 *
	 * @param force When true, re-runs initialization even if already initialized.
	 *              (Current implementation does not auto-clear; call reset() first for a clean slate.)
	 */
	static async init(force = false) {
		console.log(
			'LocalVectorStore initialized:',
			LocalVectorStore.initialized,
			'Force re-initialize?:',
			force
		);

		// Idempotent exit unless caller forces rebuild.
		if (!force && LocalVectorStore.initialized) {
			console.log('Vector store already initialized, skipping...');
			return;
		}

		console.log('checking for existing documents with embeddings...');
		const existingDocuments = await getDocuments();
		console.log('existing documents:', existingDocuments.length);

		// Stage existing embedded docs into memory first.
		if (existingDocuments.length > 0) {
			console.log(
				`adding ${existingDocuments.length} existing documents to vector store...`
			);
			await LocalVectorStore.insert(existingDocuments);
		}

		console.log('attempting to initialize entire db...');

		// Collect IDs of docs already embedded to avoid duplicates.
		const existingTransactionIds = existingDocuments.flatMap(
			(doc) => doc.id || []
		);

		// Fetch transactions lacking embeddings (exclude known IDs).
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

	/**
	 * Insert or upsert documents into the store.
	 * - If a document with the same id exists, it is replaced.
	 * - Otherwise, appended.
	 *
	 * @param documents Array of embedded documents.
	 */
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

	/**
	 * Perform a cosine similarity search over in‑memory embeddings.
	 *
	 * @param query Natural language or keyword query text.
	 * @param limit Max number of scored documents to return (defaults 200).
	 * @returns Array of Documents.DocumentWithScore (embedding removed + similarity score).
	 *
	 * Notes:
	 * - Uses OpenAI "text-embedding-3-small" (keep consistent with createDocumentsWithEmbeddings).
	 * - Does not apply authorization filtering; caller must post‑filter (e.g., via FGA).
	 * - O(n) scan; fine for small dev sets, not scalable for large corpora.
	 */
	static async search(query: string, limit = 200) {
		const model = openai.textEmbedding('text-embedding-3-small');

		// Embed the query.
		const { embedding: q } = await embed({
			model,
			value: query,
		});

		// Score all docs; remove raw embedding from returned objects.
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
