'use server';

import { getSuggestionsByDocumentId } from '@/lib/db/queries_drizzle';

export async function getSuggestions({ documentId }: { documentId: string }) {
  const suggestions = await getSuggestionsByDocumentId({ documentId });
  return suggestions ?? [];
}
