import { auth0 } from '@/lib/auth0';
import type { NextRequest } from 'next/server';
import { getChatsByUserId } from '@/lib/db/queries';
import { APIError } from '@/lib/errors';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const limit = Number.parseInt(searchParams.get('limit') || '10');
  const startingAfter = searchParams.get('starting_after');
  const endingBefore = searchParams.get('ending_before');

  if (startingAfter && endingBefore) {
    return new APIError(
      'bad_request:api',
      'Only one of starting_after or ending_before can be provided.',
    ).toResponse();
  }

  const { user } = (await auth0.getSession()) || {};

  if (!user) {
    return new APIError('unauthorized:chat').toResponse();
  }

  const chats = await getChatsByUserId({
    id: user.sub,
    limit,
    startingAfter,
    endingBefore,
  });

  return Response.json(chats);
}
