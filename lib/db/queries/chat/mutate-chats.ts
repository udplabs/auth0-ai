import { type Chat as DBChat, Prisma } from '@/lib/db/generated/prisma';
import { APIError } from '@/lib/errors';
import { convertToDB, convertToUI } from '@/lib/utils/db-converter';
// import { after } from 'next/server';
import { Prisma as PrismaNeon } from '../../generated/neon';
import { neon } from '../../neon/client';
import { prisma } from '../../prisma/client';
import { saveAppInstance } from '../settings';
import { deleteMessagesByChatId } from './mutate-messages';
import { getChatById } from './query-chats';
import { deleteStreams } from './stream';

export async function saveChat(input: Chat.CreateChatInput) {
	console.log('input:', input);
	const { messages = [], ...chat } = input;

	const convertedChat = convertToDB<
		Chat.CreateChatInput,
		Prisma.ChatCreateInput
	>(chat);
	const dbMessages = convertToDB<
		Chat.UIMessage[],
		Prisma.MessageUncheckedCreateInput[]
	>(messages, ['chatId']);

	const dbChat = await prisma.chat.create({
		data: {
			...convertedChat,
			messages: {
				create: dbMessages,
			},
		},
		include: { messages: true },
	});

	// Remote write
	// Internal mechanism to keep Neon in sync with main
	await upsertRemoteChat(dbChat, dbMessages);

	return convertToUI<DBChat, Chat.UIChat>(dbChat);
}

async function upsertRemoteChat(
	chat: DBChat,
	messages: Prisma.MessageUncheckedCreateInput[] = []
) {
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

		if (messages?.length > 0) {
			await tx.remoteMessage.createMany({
				data: messages.map((m) => ({
					...m,
					chatId: id,
				})) as PrismaNeon.RemoteMessageCreateManyInput[],
				skipDuplicates: true,
			});
		}
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
		includeStreams: true,
	});

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
