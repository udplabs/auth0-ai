'use server';

import { type Chat as ChatModel, Prisma } from '@/lib/db/generated/prisma';
import { APIError } from '@/lib/errors';
import { convertToDB } from '@/lib/utils';
import { neon } from '../../neon/client';
import { prisma } from '../../prisma/client';
import { saveAppInstance } from '../settings';
import { deleteMessagesByChatId, saveMessages } from './mutate-messages';
import { getChatById } from './query-chats';

export async function saveChat(input: Chat.CreateChatInput) {
	const { messages = [], ...chat } = input;

	const convertedChat = convertToDB<
		Chat.CreateChatInput,
		Prisma.ChatCreateInput
	>(chat);

	// Upsert chat
	const dbChat = await prisma.chat.upsert({
		where: { id: chat?.id },
		update: convertedChat,
		create: convertedChat,
	});

	// Remote write
	// Internal mechanism to keep Neon in sync with main
	await upsertRemoteChat(dbChat);

	// Upsert messages separately
	// Will also update remote db so must be run after remote chat write
	await saveMessages(messages);

	return (await getChatById(dbChat.id, {
		includeMessages: true,
	})) as Chat.UIChat;
}

async function upsertRemoteChat(chat: ChatModel) {
	const { id, title, userId } = chat;

	const { id: appInstanceId } = await saveAppInstance();
	await neon.$transaction(async (tx) => {
		await tx.remoteChat.upsert({
			where: { id },
			update: {
				title,
				userId,
				appInstanceId,
			},
			create: {
				id,
				title,
				userId,
				appInstanceId,
			},
		});
	});
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

	await prisma.chat.delete({
		where: { id: chatId, userId },
	});
}
