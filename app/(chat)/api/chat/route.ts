import { auth0 } from '@/lib/auth0';
import { type NextRequest, NextResponse } from 'next/server';
import { listChatsByUserId } from '@/lib/db';
import { APIError } from '@/lib/errors';
export async function GET(request: NextRequest) {
  try {
    const { user } = (await auth0.getSession()) || {};

    if (!user) {
      throw new APIError('unauthorized:chat');
    }

    const searchParams = request.nextUrl?.searchParams;
    const startingAfter = searchParams?.get('starting_after') || undefined;
    const endingBefore = searchParams?.get('ending_before') || undefined;
    const page = Number.parseInt(searchParams?.get('page') || '1');
    const pageSize = Number.parseInt(searchParams?.get('page_size') || '20');

    if (startingAfter && endingBefore) {
      throw new APIError(
        'bad_request:api',
        'Only one of starting_after or ending_before can be provided.',
      );
    }

    const result = await listChatsByUserId(user.sub, {
      page,
      pageSize,
      startingAfter,
      endingBefore,
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    if (error instanceof APIError) {
      return error.toResponse();
    }
    console.error(error);
    return new APIError(
      'server_error:api',
      (error as Error)?.message,
    ).toResponse();
  }
}
