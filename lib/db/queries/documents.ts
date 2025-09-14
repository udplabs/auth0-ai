// lib/db/queries/documents.ts
'use server';

import type {
	Document as DocumentModel,
	Prisma,
} from '@/lib/db/generated/prisma';
import { convertToUI } from '@/lib/utils/db-converter';
import { neon } from '../neon/client';
import { prisma } from '../prisma/client';

import type { Documents } from '@/types';

export async function saveEmbeddings(
	documents: Documents.CreateDocumentInput[],
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
				...metadata,
				...(metadata?.accountId && { accountId: metadata.accountId }),
				...(metadata?.transactionId && {
					transactionId: metadata.transactionId,
				}),
				...(metadata?.modelId && { modelId: metadata.modelId }),
				...(metadata?.accountType && { accountType: metadata.accountType }),
			},
		};
	});

	let dbResult: DocumentModel[] = [];

	if (table === 'sample') {
		dbResult = await neon.remoteSampleDocument.createManyAndReturn({
			data,
		});
		console.log('saved sample documents:', dbResult.length);
	} else {
		dbResult = await prisma.document.createManyAndReturn({
			data,
		});
	}
	const uiDocuments = convertToUI<
		DocumentModel[],
		Documents.DocumentWithEmbedding[]
	>(dbResult);

	console.log('saved embeddings:', uiDocuments.length);

	return uiDocuments;
}

export async function saveDocuments(
	documents: Documents.CreateDocumentInput[]
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

// THESE ARE INTERNAL FUNCTIONS
// DO NOT USE THIS IN ANY API ROUTES
export async function getDocumentsForVectorStore() {
	console.log('getting documents for vector store...');
	const dbDocuments = await prisma.document.findMany({
		orderBy: { createdAt: 'desc' },
	});

	const uiDocuments = convertToUI<
		DocumentModel[],
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
> {
	console.log('getting all documents...');
	const dbDocuments = await prisma.document.findMany({
		orderBy: { createdAt: 'desc' },
	});

	return convertToUI<DocumentModel[], Documents.DocumentWithEmbedding[]>(
		dbDocuments
	);
}

export async function deleteDocuments() {
	return await prisma.sampleDocument.deleteMany();
}
