import { auth0 } from '@/lib/auth0';
import { APIError } from '@/lib/errors';
import { saveDocument } from '@/lib/db';

import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new APIError(
      'bad_request:api',
      'Parameter id is required.',
    ).toResponse();
  }

  const { user } = (await auth0.getSession()) || {};

  if (!user?.sub) {
    return new APIError('unauthorized:api');
  }

  const {
    content,
    title,
    kind,
  }: Omit<
    Artifact.Document,
    'id' | 'created_at' | 'updated_at' | 'suggestions' | 'user_id' | 'metadata'
  > = await request.json();

  const document = await saveDocument(user.sub, {
    id,
    content,
    title,
    kind,
  });

  return NextResponse.json(document, { status: 200 });
}
