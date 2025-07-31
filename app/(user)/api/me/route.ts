import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

import { auth0, getUser } from '@/lib/auth0/';
import { APIError } from '@/lib/errors';

// Get user profile
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<ApiParams> },
) {
  try {
    const { cached = false } = await params;

    const { user } = (await auth0.getSession()) || {};

    if (!user) {
      throw new APIError('unauthorized:auth').toResponse();
    }
    const userId = user.sub;
    const key = `user:${userId}`;

    if (cached) {
      revalidateTag(key);
    }

    const data = await getUser({ userId, key });

    return NextResponse.json({ data });
  } catch (error) {
    console.log('API error:', error);
    if (error instanceof APIError) {
      return error.toResponse();
    }
    return new APIError(
      'server_error:api',
      error instanceof Error ? error.message : String(error),
    ).toResponse();
  }
}
