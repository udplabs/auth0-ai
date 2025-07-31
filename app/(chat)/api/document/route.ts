import { auth0 } from '@/lib/auth0';
import type { ArtifactKind } from '@/components/artifact';
import {
  deleteDocumentsByIdAfterTimestamp,
  getDocumentsById,
  saveDocument,
} from '@/lib/db/queries';
import { APIError } from '@/lib/errors';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new APIError(
      'bad_request:api',
      'Parameter id is missing',
    ).toResponse();
  }

  const { user } = (await auth0.getSession()) || {};

  if (!user) {
    return new APIError('unauthorized:document').toResponse();
  }

  const documents = await getDocumentsById({ id });

  const [document] = documents;

  if (!document) {
    return new APIError('not_found:document').toResponse();
  }

  if (document.userId !== user.sub) {
    return new APIError('forbidden:document').toResponse();
  }

  return Response.json(documents, { status: 200 });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new APIError(
      'bad_request:api',
      'Parameter id is required.',
    ).toResponse();
  }

  const { user } = (await auth0.getSession()) || {};

  if (!user) {
    return new APIError('not_found:document').toResponse();
  }

  const {
    content,
    title,
    kind,
  }: { content: string; title: string; kind: ArtifactKind } =
    await request.json();

  const documents = await getDocumentsById({ id });

  if (documents.length > 0) {
    const [document] = documents;

    if (document.userId !== user.sub) {
      return new APIError('forbidden:document').toResponse();
    }
  }

  const document = await saveDocument({
    id,
    content,
    title,
    kind,
    userId: user.sub,
  });

  return Response.json(document, { status: 200 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const timestamp = searchParams.get('timestamp');

  if (!id) {
    return new APIError(
      'bad_request:api',
      'Parameter id is required.',
    ).toResponse();
  }

  if (!timestamp) {
    return new APIError(
      'bad_request:api',
      'Parameter timestamp is required.',
    ).toResponse();
  }

  const { user } = (await auth0.getSession()) || {};

  if (!user) {
    return new APIError('unauthorized:document').toResponse();
  }

  const documents = await getDocumentsById({ id });

  const [document] = documents;

  if (document.userId !== user.sub) {
    return new APIError('forbidden:document').toResponse();
  }

  const documentsDeleted = await deleteDocumentsByIdAfterTimestamp({
    id,
    timestamp: new Date(timestamp),
  });

  return Response.json(documentsDeleted, { status: 200 });
}
