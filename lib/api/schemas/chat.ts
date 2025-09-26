import { CreateTransferSchema } from '@/lib/api/schemas/transfers';
import z from 'zod';

export const ToolResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
	z.object({
		status: z.enum([
			'success',
			'error',
			'not-found',
			'unauthorized',
			'wrong-tool',
			'input-required',
		]),
		message: z.string().optional(),
		data: schema.optional(),
		dataCount: z.number().min(0),
		hasOwnUI: z.boolean().optional(),
		error: z
			.object({
				code: z.string(),
				message: z.string(),
				cause: z.string().optional(),
				details: z.any().optional(),
			})
			.optional(),
	});

const TransferInterruptSchema = z.object({
	type: z.literal('transferFunds'),
	data: CreateTransferSchema,
});

export const UIMessageMetadataSchema = z.object({
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
	isUpVoted: z.boolean().optional(),
	isDownVoted: z.boolean().optional(),
	chatId: z.string(),
	userId: z.string().optional(),
	labModule: z.number().optional(),
	isFirstMessage: z.string().optional(),
	isHidden: z.boolean().optional(),
	interrupt: TransferInterruptSchema.optional(),
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
});
