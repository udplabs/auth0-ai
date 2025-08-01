import { openai } from '@ai-sdk/openai';
import { cosineSimilarity, embed, embedMany } from 'ai';

const EMBEDDING_MODEL = 'text-embedding-3-small';

// type VectorStoreEntry = {
// 	embedding: number[];
// 	value: FGA.Document;
// };

// let db: VectorStoreEntry[] = [];

// export async function fromDocuments(documents: FGA.Document[]) {
// 	db = [];

// 	// split into chunks
// 	const allChunks = documents.flatMap((doc) =>
// 		doc.text
// 			.split('.')
// 			.map((chunk) => ({
// 				text: chunk.trim(),
// 				metadata: doc.metadata,
// 			}))
// 			.filter((c) => c.text.length > 0)
// 	);

// 	// embed them
// 	const { embeddings } = await embedMany({
// 		model: openai.embedding(EMBEDDING_MODEL),
// 		values: allChunks.map((c) => c.text),
// 	});

// 	embeddings.forEach((emb, i) => {
// 		db.push({
// 			embedding: emb,
// 			value: allChunks[i],
// 		});
// 	});

// 	return {
// 		search: async (
// 			query: string,
// 			k = 3
// 		): Promise<FGA.DocumentWithScore[]> => {
// 			const { embedding } = await embed({
// 				model: openai.embedding('text-embedding-3-small'),
// 				value: query,
// 			});

// 			return db
// 				.map(
// 					(item) =>
// 						({
// 							document: item.value,
// 							score: cosineSimilarity(embedding, item.embedding),
// 						}) as FGA.DocumentWithScore
// 				)
// 				.sort((a, b) => b.score - a.score)
// 				.slice(0, k);
// 		},
// 	};
// }
