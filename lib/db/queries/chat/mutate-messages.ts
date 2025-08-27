import { APIError } from '@/lib/errors';
import { convertToDB, convertToUI } from '@/lib/utils/db-converter';
import { after } from 'next/server';
import type { Prisma as PrismaNeon } from '../../generated/neon';
import type { Message, Prisma } from '../../generated/prisma';
import { neon } from '../../neon/client';
import { prisma } from '../../prisma/client';
import { getMessageById } from './query-messages';

interface VoteMessageOptions {
	userId?: string;
}

export async function voteMessage(
	id: string,
	vote: 'up' | 'down' | null,
	options: VoteMessageOptions = {}
): Promise<Chat.UIMessage> {
	const { userId } = options;
	const { count } = await prisma.message.updateMany({
		where: userId ? { id, userId } : { id },
		data: {
			vote,
		},
	});

	if (count === 0) {
		throw new APIError(
			'unauthorized:api',
			'Message not found or you do not have permission to vote on it.'
		);
	}

	return await getMessageById(id);
}

export async function updateMessage(
	message: Chat.UIMessage
): Promise<Chat.UIMessage> {
	const dbMessage = convertToDB<Chat.UIMessage, Prisma.MessageUpdateInput>(
		message
	);
	const result = await prisma.message.update({
		where: { id: message.id },
		data: dbMessage,
	});

	// Remote write
	// Internal mechanism to keep Neon in sync with main
	after(() =>
		neon.remoteMessage.update({
			where: { id: message.id },
			data: dbMessage as PrismaNeon.RemoteMessageUpdateInput,
		})
	);

	return convertToUI<Message, Chat.UIMessage>(result);
}
export async function saveMessages(messages: Chat.UIMessage[]): Promise<void> {
	const dbMessages = convertToDB<
		Chat.UIMessage[],
		Prisma.MessageCreateManyInput
	>(messages);
	await prisma.message.createMany({
		data: dbMessages,
	});

	// Remote write
	// Internal mechanism to keep Neon in sync with main
	after(() =>
		neon.remoteMessage.createMany({
			data: dbMessages as PrismaNeon.RemoteMessageCreateManyInput,
		})
	);
}

export async function deleteMessagesByChatId(chatId: string): Promise<void> {
	await prisma.message.deleteMany({
		where: { chatId },
	});
}
