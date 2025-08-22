'use server';
import { myProvider } from '@/lib/ai/providers';
import { getChatById, listChatsByUserId } from '@/lib/db//queries/chat';
import { getChatByMessageId } from '@/lib/db/queries/chat';
import { deleteMessagesByChatId } from '@/lib/db/queries/message';
import { getCacheKey } from '@/lib/utils/get-cache-key';
import { type UIMessage, generateText } from 'ai';
import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';

export async function saveChatModelAsCookie(model: string) {
	const cookieStore = await cookies();
	cookieStore.set('chat-model', model);
}

export async function generateTitleFromUserMessage(message: UIMessage) {
	console.log('generating title...');
	const { text } = await generateText({
		model: myProvider.languageModel('title-model'),
		system: `\n
    - you will generate a short one-line title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
		prompt: JSON.stringify(message),
	});

	console.log('title:', text);
	return text;
}

export async function deleteTrailingMessages(
	messageId: string,
	userId: string
) {
	const { id } = await getChatByMessageId(messageId, userId);

	await deleteMessagesByChatId(id);
}

export async function getErrorMessage(error: unknown) {
	const err = error instanceof Error ? error.message : String(error);
	const cause = error instanceof Error ? error.cause : '';
	const stack = error instanceof Error ? error.stack : '';

	const prompt = `\
		Generate a user-friendly error message from the following:

		Error Message: ${err}
		Error Cause: ${cause}
		Stack Trace: ${stack}

		If the stack trace is not relevant, ignore it.
		`;

	const { text } = await generateText({
		prompt,
		system: `You are an AI assistant that generates concise, clear, but quirky error messages for users. The message should be empathetic, easy to understand, and provide guidance on what the user can do next. Less is more. Keep it under 25 words.`,
		model: myProvider.languageModel('error-model'),
	});

	return text;
}

export async function chatKey({
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

export async function getChat({
	id,
	userId,
	includeMessages = false,
	key,
	tags,
}: GetChatOptions) {
	if (!key) {
		key = await chatKey({ userId, id });
	}

	if (!tags || tags.length === 0) {
		tags = [key, 'chat'];
	}

	if (includeMessages) {
		tags.push('chat:messages');
	}

	tags = [...new Set(tags)];

	const getCachedChat = unstable_cache(
		() => getChatById(id, userId, includeMessages),
		tags,
		{ revalidate: 150, tags }
	);

	return getCachedChat();
}

export async function getChatHistory({
	userId,
	grouped = false,
	page = 1,
	pageSize = 999,
	key,
	tags,
}: GetChatHistoryOptions) {
	if (typeof grouped === 'string') grouped = grouped === 'true';
	if (typeof page === 'string') page = Number.parseInt(page);
	if (typeof pageSize === 'string') pageSize = Number.parseInt(pageSize);

	if (!key) {
		key = await chatKey({ userId, grouped, page, pageSize });
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

interface GetChatOptions extends ActionOptions {
	/**
	 * The `chatId` sent in the path as `id`.
	 */
	id: string;
	includeMessages?: boolean;
}

interface GetChatHistoryOptions extends ActionOptions {
	grouped?: boolean | string;
	page?: number | string;
	pageSize?: number | string;
}

interface ChatKeyOptions
	extends GetCacheKeyOptions,
		Omit<GetChatHistoryOptions, 'key' | 'tags' | 'cached'> {
	userId: string;
	includeMessages?: boolean;
}
