'use server';

import { APIError } from '@/lib/errors';
import { convertToUI } from '@/lib/utils/db-converter';
import { groupItemsByDate } from '@/lib/utils/group-items-by-date';

import { sql } from '@/lib/db/drizzle/sql/db';
import { chat as dChat, type ChatModel } from '@/lib/db/drizzle/sql/schema';
import type { Chat } from '@/types/chat';
import { and, desc, eq } from 'drizzle-orm';

interface GetChatByIdOptions {
	userId?: string;
	includeMessages?: boolean;
}

export async function getChatById(
	id: string,
	options: GetChatByIdOptions = {}
): Promise<Chat.UIChat | undefined> {
	const { userId, includeMessages = false } = options;
	const chat = await sql.query.chat.findFirst({
		where: eq(dChat.id, id),
		with: { messages: includeMessages ? true : undefined },
	});
	// const chat = await prisma.chat.findUnique({
	// 	where: { id },
	// 	include: { messages: includeMessages },
	// });

	if (chat) {
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
	const message = await sql.query.message.findFirst({
		where: userId
			? and(eq(dChat.id, messageId), eq(dChat.userId, userId))
			: eq(dChat.id, messageId),
		with: {
			chat: true,
		},
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

interface ListChatsByUserIdResult extends PaginatedResults {
	chats: Chat.UIChat[];
}

export async function listChatsByUserId(
	userId: string,
	options?: ListGroupedChatsParams
): Promise<Chat.GroupedItems<Chat.UIChat>>;
export async function listChatsByUserId(
	userId: string,
	options?: ListChatsParams
): Promise<ListChatsByUserIdResult>;
export async function listChatsByUserId(
	userId: string,
	options?: ListChatsParams | ListGroupedChatsParams
): Promise<ListChatsByUserIdResult | Chat.GroupedItems<Chat.UIChat>> {
	const { page = 1, pageSize: limit = 20, grouped = false } = options || {};

	const offset = (page - 1) * limit;

	const [chats, total] = await Promise.all([
		sql.query.chat.findMany({
			where: eq(dChat.userId, userId),
			orderBy: [desc(dChat.updatedAt)],
			limit,
			offset,
		}),
		sql.$count(dChat, eq(dChat.userId, userId)),
	]);

	const uiChats = chats.map(convertToUI<ChatModel, Chat.UIChat>);

	if (grouped) {
		return groupItemsByDate(uiChats);
	}

	return {
		chats: uiChats,
		total,
		page,
		pageSize: limit,
		totalPages: Math.ceil(total / limit),
	};
}
