import { getChatById, listChatsByUserId } from '@/lib/db/queries/chat';
import { getCacheKey } from '@/lib/utils';
import { unstable_cache } from 'next/cache';

export interface GetChatOptions extends ActionOptions {
	/**
	 * The `chatId` sent in the path as `id`.
	 */
	id: string;
	includeMessages?: boolean;
}

export async function getChat({
	id,
	userId,
	includeMessages = false,
	key,
	tags,
}: GetChatOptions) {
	if (!key) {
		key = chatKey({ userId, id });
	}

	if (!tags || tags.length === 0) {
		tags = [key, 'chat'];
	}

	if (includeMessages) {
		tags.push('chat:messages');
	}

	tags = [...new Set(tags)];

	const getCachedChat = unstable_cache(
		() => getChatById(id, { userId, includeMessages }),
		tags,
		{ revalidate: 150, tags }
	);

	return getCachedChat();
}

export interface GetChatHistoryOptions extends ActionOptions {
	grouped?: boolean;
	page?: number | string;
	pageSize?: number | string;
}

export async function getChatHistory({
	userId,
	grouped = false,
	page = 1,
	pageSize = 999,
	key,
	tags,
}: GetChatHistoryOptions) {
	if (typeof page === 'string') page = Number.parseInt(page);
	if (typeof pageSize === 'string') pageSize = Number.parseInt(pageSize);

	if (!key) {
		key = chatKey({ userId, grouped, page, pageSize });
	}

	if (!tags || tags.length === 0) {
		tags = [key, 'chat:history', `${userId}:chat:history`];
	}

	if (grouped) {
		tags.push('chat:history:grouped');
	}

	tags = [...new Set(tags)];

	const getCachedChatHistory = unstable_cache(() =>
		listChatsByUserId(userId, { page, pageSize, grouped })
	);

	return getCachedChatHistory();
}

interface ChatKeyOptions
	extends GetCacheKeyOptions,
		Omit<GetChatHistoryOptions, 'key' | 'tags' | 'cached'> {
	userId: string;
	includeMessages?: boolean;
}
export function chatKey({
	userId,
	id,
	resource = ['chat'],
	page,
	pageSize,
	grouped,
	includeMessages,
}: ChatKeyOptions) {
	if (!id) resource.push('history');

	const metadata = [];

	if (includeMessages) metadata.push('messages');
	if (grouped) metadata.push('grouped');
	if (page) metadata.push(`page:${page}`);
	if (pageSize) metadata.push(`pageSize:${pageSize}`);

	return getCacheKey({ userId, id, resource, metadata });
}
