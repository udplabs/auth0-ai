import { openai } from '@ai-sdk/openai';
import {
	customProvider,
	extractReasoningMiddleware,
	wrapLanguageModel,
} from 'ai';
import { chatModel, reasoningModel, titleModel } from '../../tests/models.test';
import { isTestEnvironment } from '../constants';

export const myProvider = isTestEnvironment
	? customProvider({
			languageModels: {
				'chat-model': chatModel,
				'chat-model-reasoning': reasoningModel,
				'title-model': titleModel,
			},
		})
	: customProvider({
			languageModels: {
				'chat-model': openai('gpt-5-nano'),
				'chat-model-reasoning': wrapLanguageModel({
					model: openai('gpt-5'),
					middleware: extractReasoningMiddleware({ tagName: 'think' }),
				}),
				'title-model': openai('gpt-5-nano'),
				'error-model': openai('gpt-5-nano'),
				'chunking-model': openai('gpt-5-nano'),
			},
			imageModels: {
				'small-model': openai.imageModel('gpt-4o-mini'),
			},
			textEmbeddingModels: {
				'accounts-model': openai.textEmbedding('text-embedding-3-small'),
			},
		});
