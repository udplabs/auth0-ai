import { auth0 } from '@/lib/auth0';
import { listDocumentsByUserId } from '@/lib/db';
import { APIError } from '@/lib/errors';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  try {
    const { user } = (await auth0.getSession()) || {};

    if (!user?.sub) {
      throw new APIError(
        'unauthorized:document',
        'You must be logged in to access documents.',
      );
    }

    const documents = await listDocumentsByUserId(user.sub);

    return NextResponse.json(documents, { status: 200 });
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
