import { auth0 } from '@/lib/auth0';
import { getDocumentById } from '@/lib/db';
import { APIError } from '@/lib/errors';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    if (!id) {
      throw new APIError('bad_request:api', 'Parameter `id` is required.');
    }

    const { user } = (await auth0.getSession()) || {};

    if (!user?.sub) {
      throw new APIError(
        'unauthorized:document',
        'You must be logged in to access documents.',
      );
    }

    const document = await getDocumentById(id, user.sub);

    return NextResponse.json(document, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof APIError) {
      // Don't expose 'unauthorized' errors as they may leak information
      // about the existence of documents.
      if (error.type === 'unauthorized') {
        return new APIError(
          'not_found:document',
          'Document not found.',
        ).toResponse();
      }
      return error.toResponse();
    }
    console.error(error);
    return new APIError(
      'server_error:api',
      (error as Error)?.message,
    ).toResponse();
  }
}
