import type { Stream } from '../../generated/prisma';
import { prisma } from '../../prisma/client';

export async function createStreamId(
	chatId: string,
	streamId?: string
): Promise<Stream> {
	return await prisma.stream.create({
		data: { id: streamId, chatId },
	});
}

export async function getStreamIdsByChatId(chatId: string): Promise<string[]> {
	const streams = await prisma.stream.findMany({
		where: { chatId },
		select: { id: true },
		orderBy: { createdAt: 'asc' },
	});
	return streams.map((s) => s.id);
}

export async function deleteStreams(streams: Chat.UIStream[]): Promise<void>;
export async function deleteStreams(streamId: string): Promise<void>;
export async function deleteStreams(streamIds: string[]): Promise<void>;
export async function deleteStreams(
	data: string | string[] | Chat.UIStream[]
): Promise<void> {
	const streamIds: string[] = [];
	if (typeof data === 'string') {
		// It's a single stream ID
		streamIds.push(data);
	} else if (
		Array.isArray(data) &&
		data.length &&
		typeof data[0] === 'string'
	) {
		// It's an array of stream IDs
		streamIds.push(...(data as string[]));
	} else if (
		Array.isArray(data) &&
		data.length &&
		typeof data[0] !== 'string'
	) {
		// It's an array of Chat.UIStream
		streamIds.push(...(data as Chat.UIStream[]).map((s) => s.id));
	}
	await prisma.stream.deleteMany({
		where: { id: { in: streamIds } },
	});
}
