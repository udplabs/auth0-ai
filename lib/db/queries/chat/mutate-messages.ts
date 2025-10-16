'use server';

import { APIError } from '@/lib/errors';
import { convertToDB, convertToUI } from '@/lib/utils/db-converter';

import { getMessageById } from './query-messages';

import { isDev } from '@/lib/constants';
import { sql } from '@/lib/db/drizzle/sql/db';
import {
	message as dMessage,
	MessageModel,
	MessageModelCreate,
} from '@/lib/db/drizzle/sql/schema';
import { db as drizzle } from '@/lib/db/drizzle/supabase/db';
import { remoteMessage } from '@/lib/db/drizzle/supabase/schema';
import type { Chat } from '@/types/chat';
import { and, eq } from 'drizzle-orm';

interface VoteMessageOptions {
	userId?: string;
}

export async function voteMessage(
	id: string,
	vote: 'up' | 'down' | null,
	options: VoteMessageOptions = {}
): Promise<Chat.UIMessage> {
	const { userId } = options;
	const result = await sql
		.update(dMessage)
		.set({ vote })
		.where(
			userId
				? and(eq(dMessage.id, id), eq(dMessage.userId, userId))
				: eq(dMessage.id, id)
		)
		.returning();

	if (result.length === 0) {
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
	const dbMessage = convertToDB<Chat.UIMessage, MessageModelCreate>(message);

	const [result] = await sql
		.update(dMessage)
		.set(dbMessage)
		.where(eq(dMessage.id, message.id))
		.returning();

	if (!isDev) {
		// Remote write
		// Internal mechanism to keep Supabase in sync with main
		await drizzle
			.update(remoteMessage)
			.set({
				...message,
			})
			.where(eq(remoteMessage.id, message.id));
	}

	return convertToUI<MessageModel, Chat.UIMessage>(result);
}
export async function saveMessages(messages: Chat.UIMessage[]): Promise<void> {
	const dbMessages = convertToDB<Chat.UIMessage[], MessageModelCreate[]>(
		messages
	);

	await sql.transaction(async (tx) => {
		await Promise.all(
			dbMessages.map((m) => {
				return tx.insert(dMessage).values(m).onConflictDoUpdate({
					target: dMessage.id,
					set: m,
				});
			})
		);
	});

	if (!isDev) {
		// Remote write
		// Internal mechanism to keep Supabase in sync with main
		await drizzle.transaction(async (tx) => {
			await Promise.all(
				dbMessages.map((m) => {
					const { id, createdAt, updatedAt, ...msg } = m;

					return tx
						.insert(remoteMessage)
						.values({
							// We know id exists
							id: id!,
							...msg,
							createdAt: createdAt?.toISOString(),
							updatedAt: updatedAt?.toISOString(),
						})
						.onConflictDoUpdate({
							target: remoteMessage.id,
							set: msg,
						});
				})
			);
		});
		// await prisma.$transaction([
		// 	...dbMessages.map((m) => {
		// 		return supabase.remoteMessage.upsert({
		// 			where: { id: m?.id },
		// 			update: {
		// 				...(m as RemoteMessageUpdateInput),
		// 			},
		// 			create: {
		// 				...(m as RemoteMessageCreateInput),
		// 			},
		// 		});
		// 	}),
		// ]);
	}
}

export async function deleteMessagesByChatId(chatId: string): Promise<void> {
	await sql.delete(dMessage).where(eq(dMessage.chatId, chatId));
}
