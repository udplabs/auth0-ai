import { auth0 } from '@/lib/auth0';
import { getChatById, getVotesByChatId, voteMessage } from '@/lib/db/queries';
import { APIError } from '@/lib/errors';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get('chatId');

  if (!chatId) {
    return new APIError(
      'bad_request:api',
      'Parameter chatId is required.',
    ).toResponse();
  }

  const { user } = (await auth0.getSession()) || {};

  if (!user) {
    return new APIError('unauthorized:vote').toResponse();
  }

  const chat = await getChatById({ id: chatId });

  if (!chat) {
    return new APIError('not_found:chat').toResponse();
  }

  if (chat.userId !== user.sub) {
    return new APIError('forbidden:vote').toResponse();
  }

  const votes = await getVotesByChatId({ id: chatId });

  return Response.json(votes, { status: 200 });
}

export async function PATCH(request: Request) {
  const {
    chatId,
    messageId,
    type,
  }: { chatId: string; messageId: string; type: 'up' | 'down' } =
    await request.json();

  if (!chatId || !messageId || !type) {
    return new APIError(
      'bad_request:api',
      'Parameters chatId, messageId, and type are required.',
    ).toResponse();
  }

  const { user } = (await auth0.getSession()) || {};

  if (!user) {
    return new APIError('unauthorized:vote').toResponse();
  }

  const chat = await getChatById({ id: chatId });

  if (!chat) {
    return new APIError('not_found:vote').toResponse();
  }

  if (chat.userId !== user.sub) {
    return new APIError('forbidden:vote').toResponse();
  }

  await voteMessage({
    chatId,
    messageId,
    type: type,
  });

  return new Response('Message voted', { status: 200 });
}
