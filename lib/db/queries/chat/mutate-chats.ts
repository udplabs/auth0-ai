'use server';

import { sql } from '@/lib/db/drizzle/sql/db';
import {
	ChatModel,
	ChatModelCreate,
	chat as dChat,
} from '@/lib/db/drizzle/sql/schema';
import { APIError } from '@/lib/errors';
import { convertToDB } from '@/lib/utils/db-converter';

import { deleteMessagesByChatId, saveMessages } from './mutate-messages';
import { getChatById } from './query-chats';

import type { Chat } from '@/types/chat';
import { and, eq } from 'drizzle-orm';

export async function saveChat(input: Chat.CreateChatInput) {
	const { messages = [], ...chat } = input;

	const convertedChat = convertToDB<Chat.CreateChatInput, ChatModelCreate>(
		chat
	);

	// Upsert chat
	const [dbChat] = await sql
		.insert(dChat)
		.values(convertedChat)
		.onConflictDoUpdate({ target: dChat.id, set: convertedChat })
		.returning();

	// Upsert messages separately
	await saveMessages(messages);

	return (await getChatById(dbChat.id, {
		includeMessages: true,
	})) as Chat.UIChat;
}

/**
 * Deletes a chat and all it's relations by its ID.
 */
export async function deleteChatById(
	chatId: string,
	userId: string
): Promise<void> {
	const _chat = await getChatById(chatId, {
		userId,
		includeMessages: true,
	});

	if (!_chat) {
		throw new APIError('not_found:chat');
	}

	const { messages = [], ...chat } = _chat;

	if (chat.userId !== userId) {
		throw new APIError(
			'unauthorized:chat',
			'You do not have permission to delete this chat.'
		);
	}

	if (messages.length) {
		await deleteMessagesByChatId(chatId);
	}

	await sql
		.delete(dChat)
		.where(and(eq(dChat.id, chatId), eq(dChat.userId, userId)));
}
