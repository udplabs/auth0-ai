'use server';

import { openai } from '@/lib/ai/openai';
import { chatKey } from '@/lib/api/chat/get-chat';
import { saveChat } from '@/lib/db/queries/chat/mutate-chats';
import { saveMessages } from '@/lib/db/queries/chat/mutate-messages';
import { chunk } from '@/lib/utils/chunking';
import { withStreamingJitter } from '@/lib/utils/with-streaming-jitter';
import {
	type UIMessage,
	type UIMessageStreamWriter,
	generateText,
	TextPart,
} from 'ai';
import { revalidateTag } from 'next/cache';
import { ulid } from 'ulid';

import type { Chat } from '@/types/chat';

const model = openai('gpt-5-nano');

/**
 * Generates a title from the user's message.
 * A bit heavy, but worth it.
 */
export async function generateTitleFromUserMessage(
	message: UIMessage | string
) {
	let messageText = 'Unknown';

	if (typeof message !== 'string') {
		const textPart = message.parts.find(
			(p) => p.type === 'text' && p.text
		) as TextPart;

		messageText = textPart?.text || messageText;
	}

	if (messageText === 'Unknown') return messageText;

	const { text: title } = await generateText({
		model,
		system: `\n
    - you will generate a short one-line title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
		prompt: messageText,
	});

	return title;
}

// TODO: Finish title streaming
// This method provides a way to dynamically generate a chat title without blocking the entire message delivery.
// Makes for a better user experience and is a cool little feature.
// Written by @danny-fuhriman_atko (w/ help from Aiya).
async function streamTitle(
	message: Chat.UIMessage,
	dataStream: UIMessageStreamWriter<Chat.UIMessage>
) {
	const id = ulid();
	const jitter = withStreamingJitter(dataStream, {
		shouldDelay: (part) =>
			(part as any).type === 'data-titleText' /* Only delay deltas */,
	});

	jitter.write({ type: 'data-titleTextStart', id, data: '...' });

	// Generate a title
	const title = await generateTitleFromUserMessage(message);

	// Stream it
	for (const data of chunk(title)) {
		jitter.write({ type: 'data-titleText', data, id });
	}

	jitter.write({ type: 'data-titleTextEnd', id, data: '' });

	jitter.flush();
}

// Generates a user-friendly error message from an error object.
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
		model,
	});

	return text;
}

export interface SaveMessagesActionOptions {
	chatId: string;
	userId?: string;
}

// API handler that invalidates cache + db action
export async function saveMessagesAction(
	messages: Chat.UIMessage[],
	{ chatId, userId }: SaveMessagesActionOptions
) {
	// Invalidate chat cache.
	revalidateTag(chatKey({ userId, id: chatId }));

	// Save messages to the database.
	await saveMessages(messages);
}

// API handler that invalidates cache + db action
export async function saveChatAction({
	id,
	userId,
	messages = [],
	...chat
}: Chat.CreateChatInput) {
	// Persist (upsert) chat + messages + auto title derived from last message.
	const dbChat = await saveChat({
		id,
		userId,
		messages,
		title:
			chat?.title ??
			(await generateTitleFromUserMessage(messages?.at(-1) || 'Unknown')),
		...chat,
	});

	// Invalidate chat history cache.
	revalidateTag('chat:history');
	// Invalidate chat cache.
	revalidateTag(
		chatKey({ userId: userId != null ? userId : undefined, id: dbChat.id })
	);

	return dbChat;
}
