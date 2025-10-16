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
			let currentModule: number | undefined;

			const metaModule = incomingMessage?.metadata?.labModule;

			if (
				metaModule &&
				typeof metaModule === 'number' &&
				Number.isFinite(metaModule)
			) {
				currentModule = metaModule;
			} else {
				const generatedModule = (
					await StepGuru.generate({ messages: modelMessages })
				)?.text;
				if (
					typeof generatedModule === 'number' &&
					Number.isFinite(generatedModule)
				) {
					currentModule = generatedModule;
				} else if (typeof generatedModule === 'string') {
					const parsed = parseInt(generatedModule.trim(), 10);
					if (Number.isFinite(parsed)) {
						currentModule = parsed;
					}
				}
				console.log(
					'\n\nThe Guru thinks you are working on module',
					currentModule
				);
				console.log('🤔 Is that accurate? If not, please let Aiya know!\n\n');
			}

			const systemPrompt = await getSystemPrompts({
				requestHints: {
					userId,
					...requestHints,
					settings: {
						...requestHints?.settings,
						currentModule,
					},
					auth0Domain: !!process.env.AUTH0_DOMAIN,
					auth0ClientId: !!process.env.AUTH0_CLIENT_ID,
					auth0ClientSecret: !!process.env.AUTH0_CLIENT_SECRET,
					auth0Secret: !!process.env.AUTH0_SECRET,
					fgaStoreId: !!process.env.FGA_STORE_ID,
					fgaClientId: !!process.env.FGA_CLIENT_ID,
					fgaClientSecret: !!process.env.FGA_CLIENT_SECRET,
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
