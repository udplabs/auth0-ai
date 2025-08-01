import type { Suggestion } from '../generated/prisma';
import { prisma } from '../client';

export async function saveSuggestions(
  suggestions: (Omit<
    Suggestion,
    'id' | 'created_at' | 'updated_at' | 'document_created_at'
  > & { id?: string })[],
): Promise<void> {
  await Promise.all(
    suggestions.map((suggestion) =>
      prisma.suggestion.upsert({
        where: { id: suggestion?.id || '' },
        update: { ...suggestion },
        create: { ...suggestion },
      }),
    ),
  );
}

export async function getSuggestionsByDocumentId(
  document_id: string,
): Promise<Suggestion[]> {
  return await prisma.suggestion.findMany({
    where: { document_id },
    orderBy: { created_at: 'asc' },
  });
}
