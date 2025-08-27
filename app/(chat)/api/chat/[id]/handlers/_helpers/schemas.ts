import { z } from 'zod';

// Keep this synced with Chat.MessageMetadata!
export const UIMessageMetadataSchema = z.object({
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
	isUpVoted: z.boolean().optional(),
	isDownVoted: z.boolean().optional(),
	chatId: z.string(),
	userId: z.string().optional(),
});

const MessageSchema = z.object({
	id: z.string(),
	role: z.enum(['user', 'assistant']),
	parts: z.array(z.record(z.string(), z.any()).optional()),
	metadata: UIMessageMetadataSchema.optional(),
});

export const PostRequestBodySchema = z.object({
	id: z.union([z.array(z.string()), z.string()]),
	message: MessageSchema.optional(),
	messages: z.array(MessageSchema.optional()).optional(),
});
