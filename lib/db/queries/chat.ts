import type { Chat, Message } from '../generated/prisma';
import { prisma } from '../client';
import { generateTitleFromUserMessage } from '@/app/(chat)/actions';
import { convertToDBMessage, deleteMessagesByChatId } from './message';
import { deleteStreamById } from './stream';
import { APIError } from '@/lib/errors';
import { convertToUIMessages } from '@/lib/utils';

type ChatWithMessages = Chat & { messages?: Message[] };

interface ListChatsByUserIdOptions extends PaginatedOptions {
  startingAfter?: string | null;
  endingBefore?: string | null;
}

interface ListChatsByUserIdResult extends PaginatedResults {
  chats: UIChat[];
}

interface UpsertDBChat extends Partial<Omit<Chat, 'id' | 'messages'>> {
  chat_id: string;
  user_id: string;
  title: string | null;
  visibility: 'PUBLIC' | 'PRIVATE';
  message_count: number;
}

interface UpsertUIChat extends Partial<Omit<UIChat, 'id'>> {
  chatId: string;
  userId: string;
}

interface UpsertChatParams extends UpsertUIChat {
  message?: ChatMessage;
}

interface UpsertChatParamsWithoutMessages extends UpsertChatParams {
  includeMessages: false;
}

interface UpsertChatParamsWithMessages extends UpsertChatParams {
  includeMessages: true;
}

export async function upsertChat(
  params: UpsertChatParamsWithoutMessages,
): Promise<UIChat>;
export async function upsertChat(
  options: UpsertChatParamsWithMessages,
): Promise<UIChat>;

export async function upsertChat({
  chatId,
  userId,
  message,
  includeMessages = false,
  ...chat
}:
  | UpsertChatParamsWithoutMessages
  | UpsertChatParamsWithMessages): Promise<UIChat> {
  const messageData = message && convertToDBMessage(chatId, userId, message);
  const {
    visibility,
    title,
    message_count = message ? 1 : 0,
    ...chatData
  } = convertToDBChat({ chatId, userId, ...chat });

  const result = await prisma.chat.upsert({
    where: { id: chatId },
    update: {
      visibility,
      ...(messageData && { messages: { create: messageData } }),
      message_count: { increment: message ? 1 : 0 },
    },
    create: {
      ...chatData,
      visibility,
      title:
        title ||
        (message &&
          (await generateTitleFromUserMessage({
            message: message as ChatMessage,
          }))),
      ...(messageData && { messages: { create: messageData } }),
      message_count,
    },
    include: includeMessages
      ? {
          messages: { orderBy: { created_at: 'asc' } },
        }
      : undefined,
  });

  return convertToUIChat(result);
}

/* ===== Overloads for getChatById ===== */
export async function getChatById(
  chat_id: string,
  user_id: string,
): Promise<UIChat>;
export async function getChatById(
  chat_id: string,
  user_id: string,
  includeMessages: true,
): Promise<UIChat>;
export async function getChatById(
  chat_id: string,
  user_id: string,
  includeMessages: true,
  includeStream: true,
): Promise<UIChat>;
export async function getChatById(
  chat_id: string,
  user_id: string,
  includeMessages: false,
  includeStream: true,
): Promise<UIChat>;
/* ===== */

export async function getChatById(
  chat_id: string,
  user_id: string,
  includeMessages = false,
  includeStream = false,
): Promise<UIChat> {
  const chat = await prisma.chat.findUnique({
    where: { id: chat_id },
    include: { messages: includeMessages, stream: includeStream },
  });

  if (!chat || chat === null) {
    throw new APIError('not_found:chat', `Chat with id ${chat_id} not found.`);
  }

  if (chat?.user_id !== user_id) {
    throw new APIError(
      'unauthorized:api',
      'You do not have access to this chat.',
    );
  }

  return convertToUIChat(chat);
}

export async function listChatsByUserId(
  user_id: string,
  options?: ListChatsByUserIdOptions,
): Promise<ListChatsByUserIdResult> {
  const {
    page = 1,
    pageSize = 20,
    startingAfter,
    endingBefore,
  } = options || {};

  const skip = (page - 1) * pageSize;

  const AND = [];

  if (startingAfter) {
    AND.push({ created_at: { gte: startingAfter } });
  } else if (endingBefore) {
    AND.push({ created_at: { lte: endingBefore } });
  }

  const where = AND.length > 0 ? { AND: [{ user_id }, ...AND] } : { user_id };

  const [chats, total] = await Promise.all([
    prisma.chat.findMany({
      where,
      orderBy: { updated_at: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.chat.count({
      where,
    }),
  ]);

  return {
    chats: chats.map(convertToUIChat),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
/**
 * Deletes a chat and all it's relations by its ID.
 */
export async function deleteChatById(
  chat_id: string,
  user_id: string,
): Promise<void> {
  const {
    messages = [],
    stream,
    ...chat
  } = await getChatById(chat_id, user_id, true, true);

  if (chat.userId !== user_id) {
    throw new APIError(
      'unauthorized:chat',
      'You do not have permission to delete this chat.',
    );
  }

  if (stream) {
    await deleteStreamById(stream.id);
  }

  if (messages.length) {
    await deleteMessagesByChatId(chat_id);
  }

  await prisma.chat.delete({
    where: { id: chat_id, user_id },
  });
}

export async function updateChatVisibilityById(
  chat_id: string,
  user_id: string,
  visibility: 'private' | 'public',
): Promise<UIChat> {
  const chat = await prisma.chat.update({
    where: { id: chat_id, user_id },
    data: { visibility: visibility.toUpperCase() as 'PUBLIC' | 'PRIVATE' },
  });

  return convertToUIChat(chat);
}

export function convertToDBChat({
  createdAt,
  updatedAt,
  userId: user_id,
  messageCount: message_count = 0,
  visibility,
  title,
  chatId: chat_id,
  ...chat
}: UpsertUIChat): UpsertDBChat {
  return {
    created_at: createdAt ? new Date(createdAt) : undefined,
    updated_at: updatedAt ? new Date(updatedAt) : undefined,
    visibility: (visibility?.toUpperCase() as 'PUBLIC' | 'PRIVATE') || 'PUBLIC',
    title: title || null,
    user_id,
    chat_id,
    message_count,
    ...chat,
  };
}

export function convertToUIChat({
  created_at,
  updated_at,
  visibility,
  message_count: messageCount,
  title,
  user_id: userId,
  messages,
  ...chat
}: ChatWithMessages): UIChat {
  return {
    ...chat,
    createdAt: created_at.toISOString(),
    updatedAt: updated_at.toISOString(),
    visibility: visibility.toLowerCase() as 'public' | 'private',
    messageCount,
    userId,
    title: title || undefined,
    ...(messages
      ? { messages: convertToUIMessages(chat.id, messages) }
      : undefined),
  };
}
