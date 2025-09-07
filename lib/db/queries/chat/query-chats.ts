'use server';

import type { Chat as ChatModel } from '@/lib/db/generated/prisma';
import { APIError } from '@/lib/errors';
import { groupItemsByDate } from '@/lib/utils';
import { convertToUI } from '@/lib/utils/db-converter';
import { prisma } from '../../prisma/client';

interface GetChatByIdOptions {
	userId?: string;
	includeMessages?: boolean;
	includeStreams?: boolean;
}

export async function getChatById(
	id: string,
	options: GetChatByIdOptions = {}
): Promise<Chat.UIChat | undefined> {
	const { userId, includeMessages = false, includeStreams = false } = options;

	const chat = await prisma.chat.findUnique({
		where: { id },
		include: { messages: includeMessages, streams: includeStreams },
	});

	if (chat !== null) {
		if (userId && chat.userId && chat.userId !== userId) {
			throw new APIError(
				'unauthorized:api',
				'You do not have access to this chat.'
			);
		}

		return convertToUI<ChatModel, Chat.UIChat>(chat);
	}
}

export async function getChatByMessageId(messageId: string, userId?: string) {
	const message = await prisma.message.findUnique({
		where: userId ? { id: messageId, userId } : { id: messageId },
		include: { chat: true },
	});

	if (!message) {
		throw new APIError(
			'not_found:chat',
			`Unable to retrieve chat at this time. Please try again later.`
		);
	}

	return convertToUI<ChatModel, Chat.UIChat>(message.chat);
}

export interface ListChatsParams extends PaginatedOptions {
	grouped?: boolean;
}
export interface ListGroupedChatsParams extends PaginatedOptions {
	grouped: boolean;
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

	const uiChats = chats.map(convertToUI<ChatModel, Chat.UIChat>);

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
