import type { Message, Prisma } from '../generated/prisma';

import { APIError } from '@/lib/errors';
import { convertToDB, convertToUI } from '@/lib/utils/db-converter';
import { prisma } from '../client';

export async function getMessagesByChatId(
	chatId: string
): Promise<Chat.UIMessage[]> {
	return convertToUI<Message[], Chat.UIMessage[]>(
		await prisma.message.findMany({
			where: { chatId },
			orderBy: { createdAt: 'asc' },
		})
	);
}

export async function getMessageById(id: string): Promise<Chat.UIMessage> {
	const message = await prisma.message.findUniqueOrThrow({
		where: { id },
	});

	return convertToUI<Message, Chat.UIMessage>(message);
}

export async function voteMessage(
	userId: string,
	id: string,
	vote: 'up' | 'down' | null
): Promise<Chat.UIMessage> {
	const { count } = await prisma.message.updateMany({
		where: { id, userId },
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
	const result = await prisma.message.update({
		where: { id: message.id },
		data: convertToDB(message),
	});

	return convertToUI<Message, Chat.UIMessage>(result);
}
export async function saveMessages(messages: Chat.UIMessage[]): Promise<void> {
	await prisma.message.createMany({
		data: convertToDB<Chat.UIMessage[], Prisma.MessageUncheckedCreateInput>(
			messages
		),
	});
}

export async function deleteMessagesByChatId(chatId: string): Promise<void> {
	await prisma.message.deleteMany({
		where: { chatId },
	});
}
