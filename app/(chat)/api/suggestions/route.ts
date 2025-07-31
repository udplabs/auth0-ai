import { auth0 } from '@/lib/auth0';
import { getSuggestionsByDocumentId } from '@/lib/db/queries';
import { APIError } from '@/lib/errors';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const documentId = searchParams.get('documentId');

  if (!documentId) {
    return new APIError(
      'bad_request:api',
      'Parameter documentId is required.',
    ).toResponse();
  }

  const { user } = (await auth0.getSession()) || {};

  if (!user) {
    return new APIError('unauthorized:suggestions').toResponse();
  }

  const suggestions = await getSuggestionsByDocumentId({
    documentId,
  });

  const [suggestion] = suggestions;

  if (!suggestion) {
    return Response.json([], { status: 200 });
  }

  if (suggestion.userId !== user.sub) {
    return new APIError('forbidden:api').toResponse();
  }

  return Response.json(suggestions, { status: 200 });
}
