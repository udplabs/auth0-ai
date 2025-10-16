'use server';

import { sql } from '@/lib/db/drizzle/sql/db';
import { message as dMessage, MessageModel } from '@/lib/db/drizzle/sql/schema';
import { convertToUI } from '@/lib/utils/db-converter';
import { asc, eq } from 'drizzle-orm';

import type { Chat } from '@/types/chat';

export async function getMessagesByChatId(
	chatId: string
): Promise<Chat.UIMessage[]> {
	return convertToUI<MessageModel[], Chat.UIMessage[]>(
		await sql.query.message.findMany({
			where: eq(dMessage.chatId, chatId),
			orderBy: asc(dMessage.createdAt),
		})
	);
}

export async function getMessageById(id: string): Promise<Chat.UIMessage> {
	const message = await sql.query.message.findFirst({
		where: eq(dMessage.id, id),
	});

	if (!message) throw new Error('Message not found');

	return convertToUI<MessageModel, Chat.UIMessage>(message);
}
