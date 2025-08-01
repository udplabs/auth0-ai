import { auth0 } from '@/lib/auth0';
import { deleteDocumentById } from '@/lib/db';
import { APIError } from '@/lib/errors';
import { type NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return new APIError('bad_request:api', 'Parameter `id` is required.');
    }

    const { user } = (await auth0.getSession()) || {};

    if (!user?.sub) {
      return new APIError(
        'unauthorized:document',
        'You must be logged in to delete documents.',
      ).toResponse();
    }

    await deleteDocumentById(id, user.sub);

    return NextResponse.json({}, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof APIError) {
      if (error.type === 'unauthorized') {
        // Don't expose 'unauthorized' errors as they may leak information
        // about the existence of documents.
        return new APIError(
          'forbidden:document',
          'Unable to delete this document at this time.',
        ).toResponse();
      }
      return error.toResponse();
    }
    return new APIError(
      'server_error:api',
      (error as Error)?.message,
    ).toResponse();
  }
}
