import { prisma } from '../client';
import type { Stream } from '../generated/prisma';

export async function createStreamId(
  chat_id: string,
  stream_id?: string,
): Promise<Stream> {
  return await prisma.stream.create({
    data: { id: stream_id, chat_id },
  });
}

export async function getStreamIdsByChatId(chat_id: string): Promise<string[]> {
  const streams = await prisma.stream.findMany({
    where: { chat_id },
    select: { id: true },
    orderBy: { created_at: 'asc' },
  });
  return streams.map((s) => s.id);
}

export async function deleteStreamById(stream_id: string): Promise<void> {
  await prisma.stream.delete({
    where: { id: stream_id },
  });
}
