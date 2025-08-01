import type { Message } from '../generated/prisma';

import { prisma } from '../client';
import { APIError } from '@/lib/errors';
import { convertToUIMessages } from '@/lib/utils';

export async function getMessagesByChatId(chat_id: string): Promise<Message[]> {
  return await prisma.message.findMany({
    where: { chat_id },
    orderBy: { created_at: 'asc' },
  });
}

export async function getMessageById(message_id: string): Promise<ChatMessage> {
  const message = await prisma.message.findUniqueOrThrow({
    where: { id: message_id },
  });

  const [uiMessage] = convertToUIMessages(message.chat_id, [message]);

  return uiMessage;
}

export async function voteMessage(
  user_id: string,
  id: string,
  vote: 'UP' | 'DOWN' | null,
): Promise<void> {
  const { count } = await prisma.message.updateMany({
    where: { id, user_id },
    data: {
      vote,
    },
  });

  if (count === 0) {
    throw new APIError(
      'unauthorized:api',
      'Message not found or you do not have permission to vote on it.',
    );
  }
}

export async function getMessageCountByUserId(
  user_id: string,
): Promise<number> {
  const result = await prisma.chat.aggregate({
    _sum: { message_count: true },
    where: { user_id },
  });
  return result._sum.message_count || 0;
}

export async function saveMessages(
  chat_id: string,
  user_id: string,
  messages: ChatMessage[],
): Promise<void> {
  await prisma.message.createMany({
    data: messages.map((message) =>
      convertToDBMessage(chat_id, user_id, message),
    ),
  });
}

export async function deleteMessagesByChatId(chat_id: string): Promise<void> {
  await prisma.message.deleteMany({
    where: { chat_id },
  });
}

export function convertToDBMessage(
  chat_id: string,
  user_id: string,
  { id, metadata, parts, role }: ChatMessage,
) {
  return {
    id,
    chat_id,
    user_id,
    role,
    parts: JSON.stringify(parts || []),
    metadata: JSON.stringify(metadata || {}),
  };
}
