import type { AttachmentDocument, Suggestion } from '../generated/prisma';
import { prisma } from '../client';
import { APIError } from '@/lib/errors';

type GetDocumentResult = AttachmentDocument;
type GetDocumentWithSuggestionsResult = AttachmentDocument & {
  suggestions: Suggestion[];
};

export async function saveDocument(
  user_id: string,
  {
    id,
    title,
    kind,
    content,
  }: Omit<
    Artifact.Document,
    'created_at' | 'updated_at' | 'suggestions' | 'user_id' | 'metadata'
  >,
): Promise<AttachmentDocument> {
  return await prisma.attachmentDocument.upsert({
    where: { id, user_id },
    update: { title, kind, content },
    create: { id, title, kind, content, user_id },
  });
}

export async function getDocumentById(
  id: string,
  user_id: string,
): Promise<GetDocumentResult>;
export async function getDocumentById(
  id: string,
  user_id: string,
  includeSuggestions: true,
): Promise<GetDocumentWithSuggestionsResult>;
export async function getDocumentById(
  id: string,
  user_id: string,
  includeSuggestions?: boolean,
): Promise<GetDocumentResult | GetDocumentWithSuggestionsResult> {
  const doc = await prisma.attachmentDocument.findUnique({
    where: { id, user_id },
    include: {
      suggestions: includeSuggestions || false,
    },
  });

  if (doc === null) {
    throw new APIError('not_found:document', 'Document not found.');
  }

  if (doc?.user_id !== user_id) {
    throw new APIError(
      'unauthorized:document',
      'You do not have access to this document.',
    );
  }

  return doc;
}

export async function listDocumentsByUserId(
  user_id: string,
): Promise<AttachmentDocument[]> {
  return await prisma.attachmentDocument.findMany({
    where: { user_id },
    orderBy: { updated_at: 'desc' },
  });
}

export async function deleteDocumentById(
  id: string,
  user_id: string,
): Promise<void> {
  await getDocumentById(id, user_id);

  await prisma.attachmentDocument.delete({
    where: { id, user_id },
  });
}
