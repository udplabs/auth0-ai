import { z } from 'zod';

export const postRequestBodySchema = z.object({
	id: z.union([z.array(z.string()), z.string()]),
	message: z.object({
		id: z.string(),
		role: z.enum(['user', 'assistant']),
		parts: z.array(z.record(z.string(), z.any()).optional()),
		metadata: z.record(z.string(), z.any()).optional(),
	}),
	selectedChatModel: z.enum(['chat-model', 'chat-model-reasoning']),
});
