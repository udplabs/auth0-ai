import { type Chat as DBChat, Prisma } from '@/lib/db/generated/prisma';
import { APIError } from '@/lib/errors';
import { convertToDB, convertToUI } from '@/lib/utils/db-converter';
import { groupItemsByDate } from '@/lib/utils/group-items-by-date';
import { prisma } from '../client';
import { deleteMessagesByChatId } from './message';
import { deleteStreams } from './stream';

interface ListChatsParams extends PaginatedOptions {
	grouped?: boolean;
}
interface ListGroupedChatsParams extends PaginatedOptions {
	grouped: boolean;
}

export async function saveChat(input: Chat.CreateChatInput) {
	console.log('input:', input);
	const { messages = [], ...chat } = input;

	const dbChat = await prisma.chat.create({
		data: {
			...convertToDB<Chat.CreateChatInput, Prisma.ChatCreateInput>(chat),
			messages: {
				create: convertToDB<
					Chat.UIMessage[],
					Prisma.MessageUncheckedCreateInput[]
				>(messages, ['chatId']),
			},
		},
		include: { messages: true },
	});

	return convertToUI<DBChat, Chat.UIChat>(dbChat);
}

/* ===== Overloads for getChatById ===== */
export async function getChatById(
	id: string,
	user_id: string
): Promise<Chat.UIChat | undefined>;
export async function getChatById(
	id: string,
	user_id: string,
	includeMessages?: boolean
): Promise<Chat.UIChat | undefined>;
export async function getChatById(
	id: string,
	user_id: string,
	includeMessages: true
): Promise<Chat.UIChat | undefined>;
export async function getChatById(
	id: string,
	user_id: string,
	includeMessages: true,
	includeStream: true
): Promise<Chat.UIChat | undefined>;
export async function getChatById(
	id: string,
	user_id: string,
	includeMessages: false,
	includeStream: true
): Promise<Chat.UIChat | undefined>;
/* ===== */

export async function getChatById(
	chatId: string,
	userId: string,
	includeMessages = false,
	includeStreams = false
): Promise<Chat.UIChat | undefined> {
	// Handle case where chatId is an array (from query params)
	const id = Array.isArray(chatId) ? chatId[0] : chatId;

	const chat = await prisma.chat.findUnique({
		where: { id },
		include: { messages: includeMessages, streams: includeStreams },
	});

	if (chat !== null) {
		if (chat?.userId !== userId) {
			throw new APIError(
				'unauthorized:api',
				'You do not have access to this chat.'
			);
		}

		return convertToUI<DBChat, Chat.UIChat>(chat);
	}
}

export async function getChatByMessageId(messageId: string, userId: string) {
	const message = await prisma.message.findUnique({
		where: { id: messageId, userId },
		include: { chat: true },
	});

	if (!message) {
		throw new APIError(
			'not_found:chat',
			`Unable to retrieve chat at this time. Please try again later.`
		);
	}

	return convertToUI<DBChat, Chat.UIChat>(message.chat);
}
export async function listChatsByUserId(
	userId: string,
	options?: ListGroupedChatsParams
): Promise<Chat.GroupedItems<Chat.UIChat>>;
export async function listChatsByUserId(
	userId: string,
	options?: ListChatsParams
): Promise<Chat.ListChatsByUserIdResult>;
export async function listChatsByUserId(
	userId: string,
	options?: ListChatsParams | ListGroupedChatsParams
): Promise<Chat.ListChatsByUserIdResult | Chat.GroupedItems<Chat.UIChat>> {
	const { page = 1, pageSize = 20, grouped = false } = options || {};

	const skip = (page - 1) * pageSize;

	const [chats, total] = await Promise.all([
		prisma.chat.findMany({
			where: {
				userId,
			},
			orderBy: { updatedAt: 'desc' },
			skip,
			take: pageSize,
		}),
		prisma.chat.count({
			where: {
				userId,
			},
		}),
	]);

	const uiChats = chats.map(convertToUI<DBChat, Chat.UIChat>);

	if (grouped) {
		return groupItemsByDate(uiChats);
	}

	return {
		chats: uiChats,
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
	chatId: string,
	userId: string
): Promise<void> {
	const _chat = await getChatById(chatId, userId, true, true);

	if (!_chat) {
		throw new APIError('not_found:chat');
	}

	const { messages = [], streams = [], ...chat } = _chat;

	if (chat.userId !== userId) {
		throw new APIError(
			'unauthorized:chat',
			'You do not have permission to delete this chat.'
		);
	}

	if (streams.length > 0) {
		await deleteStreams(streams);
	}

	if (messages.length) {
		await deleteMessagesByChatId(chatId);
	}

	await prisma.chat.delete({
		where: { id: chatId, userId },
	});
}
