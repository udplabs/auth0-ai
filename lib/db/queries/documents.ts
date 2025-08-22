import type { Document, Prisma } from '@/lib/db/generated/prisma';
import { convertToUI } from '@/lib/utils/db-converter';
import { prisma } from '../client';

export async function saveEmbeddings(
	documents: Documents.Document[],
	embeddings: Documents.Embedding[],
	table: 'sample' | 'dev' = 'sample'
): Promise<Documents.DocumentWithEmbedding[]> {
	console.log('saving embeddings to documents:', embeddings.length);

	const data = embeddings.map((embedding, index) => {
		const { metadata = {}, ...doc } = documents[index];
		return {
			...doc,
			embedding,
			metadata: {
				...(metadata?.accountId && { accountId: metadata.accountId }),
				...(metadata?.transactionId && {
					transactionId: metadata.transactionId,
				}),
				...(metadata?.modelId && { modelId: metadata.modelId }),
				...(metadata?.accountType && { accountType: metadata.accountType }),
				...(metadata?.customerId && { userId: metadata.customerId }),
			},
		};
	});

	let dbResult: Document[] = [];

	if (table === 'sample') {
		dbResult = await prisma.sampleDocument.createManyAndReturn({
			data,
		});
		console.log('saved sample documents:', dbResult.length);
	} else {
		dbResult = await prisma.document.createManyAndReturn({
			data,
		});
	}
	const uiDocuments = convertToUI<
		Document[],
		Documents.DocumentWithEmbedding[]
	>(dbResult);

	console.log('saved embeddings:', uiDocuments.length);

	return uiDocuments;
}

export async function saveDocuments(
	documents: Documents.DocumentWithEmbedding[]
) {
	console.log('saving documents:', documents.length);

	const { count } = await prisma.document.createMany({
		data: documents.map(({ metadata, embedding, ...rest }) => {
			return {
				...rest,
				embedding: embedding as Prisma.JsonArray,
				metadata: metadata as Prisma.JsonObject,
			};
		}),
	});

	console.log('saved documents with embeddings:', count);

	return;
}

// export function convertDBEmbeddingToUIEmbedding(
// 	embeddings: Embedding[],
// ): DB.UIEmbedding[] {
// 	return embeddings.map(
// 		({ createdAt, embedding, updatedAt, metadata, ...rest }) => ({
// 			...rest,
// 			embedding: embedding as number[],
// 			metadata: {
// 				createdAt: createdAt.toISOString(),
// 				updatedAt: updatedAt.toISOString(),
// 				...(metadata as DB.DocumentMetadata),
// 			},
// 		})
// 	);
// }

// THESE ARE INTERNAL FUNCTIONS
// DO NOT USE THIS IN ANY API ROUTES
export async function getDocumentsForVectorStore() {
	console.log('getting documents for vector store...');
	const dbDocuments = await prisma.document.findMany({
		orderBy: { createdAt: 'desc' },
	});

	const uiDocuments = convertToUI<
		Document[],
		Documents.DocumentWithEmbedding[]
	>(dbDocuments);

	const embeddings: number[][] = [];
	const documents: Documents.Document[] = [];

	// Separate documents and embeddings
	for (const uiDocument of uiDocuments) {
		const { embedding, ...doc } = uiDocument;
		embeddings.push(embedding);
		documents.push(doc);
	}

	console.log('found embeddings:', embeddings.length);
	console.log('found documents:', documents.length);

	return [embeddings, documents] as const;
}
export async function getDocuments(): Promise<
	Documents.DocumentWithEmbedding[]
>;
export async function getDocuments(
	table: 'dev'
): Promise<Documents.DocumentWithEmbedding[]>;
export async function getDocuments(
	table?: 'sample' | 'dev'
): Promise<Documents.DocumentWithEmbedding[]> {
	console.log('getting all documents...');
	if (table === 'dev') {
		const dbDocuments = await prisma.document.findMany({
			orderBy: { createdAt: 'desc' },
		});

		return convertToUI<Document[], Documents.DocumentWithEmbedding[]>(
			dbDocuments
		);
	}

	const dbSampleDocs = await prisma.sampleDocument.findMany();

	return convertToUI<Document[], Documents.DocumentWithEmbedding[]>(
		dbSampleDocs
	);
}

export async function deleteDocuments(table: 'sample' | 'dev' = 'sample') {
	if (table === 'dev') {
		return await prisma.document.deleteMany();
	}

	return await prisma.sampleDocument.deleteMany();
}
