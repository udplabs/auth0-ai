import { auth0 } from '@/lib/auth0';
import { deleteChatById } from '@/lib/db';
import { APIError } from '@/lib/errors';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export const maxDuration = 60;

export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    if (!id) {
      throw new APIError('bad_request:api');
    }

    const { user } = (await auth0.getSession()) || {};

    if (!user?.sub) {
      throw new APIError('unauthorized:chat');
    }

    await deleteChatById(id, user.sub);

    return NextResponse.json({}, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof APIError) {
      if (error.type === 'unauthorized') {
        // Don't expose 'unauthorized' errors as they may leak information
        // about the existence of chats.
        return new APIError(
          'forbidden:chat',
          'Unable to delete this chat at this time.',
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
