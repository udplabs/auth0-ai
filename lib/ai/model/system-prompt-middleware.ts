// lib/ai/model/system-prompt-middleware.ts
import { getProviderOptions } from '@/lib/ai/model/utils';
import { getSystemPrompts } from '@/lib/ai/prompts/system-prompt';
import type { Chat } from '@/types/chat';
import type { LanguageModelV2Middleware } from '@ai-sdk/provider';
import { StepGuru } from '../agents/step-guru';

export const systemPromptMiddleware: LanguageModelV2Middleware = {
	transformParams: async ({ params }) => {
		const { incomingMessage, modelMessages, chatId, userId, requestHints } =
			getProviderOptions<Chat.SystemPromptMiddlewareOptions>(
				'systemPromptMiddleware',
				params
			) || {};

		if (incomingMessage && modelMessages && chatId) {
			const currentLabStep =
				incomingMessage?.metadata?.labStep ??
				(await StepGuru.generate({ messages: modelMessages }))?.text;

			const systemPrompt = await getSystemPrompts({
				requestHints: {
					userId,
					...requestHints,
					settings: {
						...requestHints?.settings,
						currentLabStep,
					},
				},
			});

			// System prompts to the front, to the front... 🎶
			if (systemPrompt.length > 0) {
				params.prompt = [
					{
						role: 'system',
						content: systemPrompt,
					},
					...params?.prompt,
				];
			}
		}

		return params;
	},
};
