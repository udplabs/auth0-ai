import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

import { auth0, ManagementClient } from '@/lib/auth0/';
import { APIError } from '@/lib/errors';

// Delete user authenticator
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<ApiParams> },
) {
  try {
    const { id: authentication_method_id, cached = false } = await params;

    const { user } = (await auth0.getSession()) || {};

    if (!user) {
      throw new APIError('unauthorized:auth').toResponse();
    }

    if (!authentication_method_id) {
      throw new APIError('bad_request:api').toResponse();
    }

    const userId = user.sub;
    const client = new ManagementClient();

    await client.users.deleteAuthenticationMethod({
      id: userId,
      authentication_method_id,
    });

    revalidateTag(`user:${userId}:authenticators`);

    return NextResponse.json({}, { status: 204 });
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
