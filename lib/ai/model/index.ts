// lib/ai/model/index.ts
import { openai } from '@/lib/ai/model/openai';
import { wrapLanguageModel } from 'ai';
import { cacheMiddleware } from './cache-middleware';
import { contentMiddleware } from './content-middleware';
import { interruptsMiddleware } from './interrupts-middleware';
import { systemPromptMiddleware } from './system-prompt-middleware';

export const model = wrapLanguageModel({
	model: openai('gpt-5-mini'),
	// THE ORDER MATTERS!
	middleware: [
		// Injects messages from DB cache if available.
		cacheMiddleware,
		// Short-circuits if there is injectable static content available.
		contentMiddleware,
		// Partners with Agent StepGuru to provide contextual assistance.
		systemPromptMiddleware,
		// Handles Auth0 user interrupts like a pro.
		interruptsMiddleware,
	],
});
