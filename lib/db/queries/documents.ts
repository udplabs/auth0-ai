// lib/db/queries/documents.ts
'use server';

import type { DocumentModel } from '@/lib/db/generated/prisma/models';
import { convertToUI } from '@/lib/utils/db-converter';
import {
	JsonArray,
	JsonObject,
} from '../generated/prisma/internal/prismaNamespace';
import { prisma } from '../prisma/client';
import { supabase } from '../supabase/client';

import type { Documents } from '@/types/documents';

export async function saveEmbeddings(
	documents: Documents.CreateDocumentInput[],
	embeddings: Documents.Embedding[],
	table: 'sample' | 'dev' = 'sample'
): Promise<Documents.DocumentWithEmbedding[]> {
	console.info('saving embeddings to documents:', embeddings.length);

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
		dbResult = await supabase.remoteSampleDocument.createManyAndReturn({
			data,
		});
		console.info('saved sample documents:', dbResult.length);
	} else {
		dbResult = await prisma.document.createManyAndReturn({
			data,
		});
	}
	const uiDocuments = convertToUI<
		DocumentModel[],
		Documents.DocumentWithEmbedding[]
	>(dbResult);

	console.info('saved embeddings:', uiDocuments.length);

	return uiDocuments;
}

export async function saveDocuments(
	documents: Documents.CreateDocumentInput[]
) {
	console.info('saving documents:', documents.length);

	const { count } = await prisma.document.createMany({
		data: documents.map(({ metadata, embedding, ...rest }) => {
			return {
				...rest,
				embedding: embedding as JsonArray,
				metadata: metadata as JsonObject,
			};
		}),
	});

	console.info('saved documents with embeddings:', count);

	return;
}

// THESE ARE INTERNAL FUNCTIONS
// DO NOT USE THIS IN ANY API ROUTES
export async function getDocumentsForVectorStore() {
	console.info('getting documents for vector store...');
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

	console.info('found embeddings:', embeddings.length);
	console.info('found documents:', documents.length);

	return [embeddings, documents] as const;
}
export async function getDocuments(): Promise<
	Documents.DocumentWithEmbedding[]
> {
	console.info('getting all documents...');
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
