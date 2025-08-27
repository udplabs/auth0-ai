import { convertToUI } from '@/lib/utils/db-converter';
import type { Message } from '../../generated/prisma';
import { prisma } from '../../prisma/client';

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
