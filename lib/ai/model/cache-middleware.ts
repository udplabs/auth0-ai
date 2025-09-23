import { saveChatAction } from '@/app/(chat)/api/actions';
import { getProviderOptions } from '@/lib/ai/model/utils';
import { UIMessageMetadataSchema } from '@/lib/api/schemas/chat';
import { getUser } from '@/lib/auth0/client';
import type { Chat } from '@/types/chat';
import type {
	LanguageModelV2Middleware,
	LanguageModelV2Prompt,
	SharedV2ProviderOptions,
} from '@ai-sdk/provider';
import { convertToModelMessages, validateUIMessages } from 'ai';

export const cacheMiddleware: LanguageModelV2Middleware = {
	transformParams: async ({ params }) => {
		const { chatId, tools, incomingMessage } =
			getProviderOptions<Chat.CacheMiddlewareOptions>(
				'cacheMiddleware',
				params
			) || {};

		// Only run if we have a 1) chatId, 2) incoming UIMessage(s), 3 messages have NOT been provided to the model (yet) -- that's this middleware's job.
		if (params.prompt.length === 1 && chatId && tools && incomingMessage) {
			// Best-effort user fetch (false => do not throw if unauthenticated).
			const user = await getUser(false);
			const userId = user?.sub;

			// Decorate incoming UI message with metadata for persistence / later retrieval.
			const decoratedMessage = {
				...incomingMessage,
				metadata: { ...incomingMessage?.metadata, userId, chatId },
			} as Chat.UIMessage;

			const validatedMessages = await validateUIMessages<Chat.UIMessage>({
				messages: [decoratedMessage],
				tools,
				metadataSchema: UIMessageMetadataSchema,
			});

			// Persist (upsert) chat + messages + auto title derived from last message.
			// This saves from having to pass entire conversations back/forth. Reduces chattiness.
			// This is the sole purpose of this middleware!
			// TODO: Remove incoming `interrupt` to avoid persisting account data
			const chat = await saveChatAction({
				id: chatId,
				userId,
				messages: validatedMessages as Chat.UIMessage[],
			});

			const modelMessages = convertToModelMessages(chat.messages || [], tools);

			// Setup upcoming middleware with proper options
			params = {
				...params,
				providerOptions: {
					...params.providerOptions,
					contentMiddleware: {
						...params?.providerOptions?.contentMiddleware,
						userId,
					},
					systemPromptMiddleware: {
						...params?.providerOptions?.systemPromptMiddleware,
						modelMessages,
						userId,
					},
				} as any as SharedV2ProviderOptions,
				// LanguageModelV2Prompt is just ModelMessage[]
				// Not sure why Vercel overcomplicated it?
				prompt: modelMessages as LanguageModelV2Prompt,
			};
		}

		return params;
	},
};
