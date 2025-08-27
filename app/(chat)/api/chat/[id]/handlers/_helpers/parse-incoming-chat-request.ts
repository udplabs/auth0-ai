import { generateTitleFromUserMessage } from '@/app/(chat)/api/actions';
import { getUser } from '@/lib/auth0';
import { getChatById, saveChat, saveMessages } from '@/lib/db/queries/chat';
import { APIError } from '@/lib/errors';

import { z } from 'zod';
import { PostRequestBodySchema } from './schemas';

type PostRequestBody = z.infer<typeof PostRequestBodySchema>;

export async function parseIncomingChatRequest(
	request: TypedNextRequest<PostRequestBody>,
	{ id: _id }: ApiPathParams
) {
	const body = await request.json();

	const {
		id = _id,
		message,
		messages: _messages = [],
	} = PostRequestBodySchema.parse(body) as PostRequestBody;

	const user = await getUser(false);
	const userId = user?.sub;

	const chatId = id && Array.isArray(id) ? id[0] : id;

	let dbChat = await getChatById(chatId, {
		userId,
		includeMessages: true,
	});

	if (message && _messages.length > 0) {
		throw new APIError(
			'bad_request:chat',
			'Either message or messages must be provided. Not both.'
		);
	}

	if (message && _messages.length === 0) {
		_messages.push(message);
	}

	const incomingMessages = _messages.map((m, i) => ({
		...m,
		metadata: { ...m?.metadata, userId, chatId },
	})) as Chat.UIMessage[];

	if (!dbChat) {
		// Chat does not exist. Create it!
		dbChat = await saveChat({
			id: chatId,
			userId,
			messages: incomingMessages,
			title: await generateTitleFromUserMessage(
				incomingMessages[incomingMessages.length - 1]
			),
		});
	} else {
		if (incomingMessages.length > 0) {
			// Add incoming messages to DB
			await saveMessages(incomingMessages);
		}
	}

	return dbChat;
}
