import z from 'zod';

export const SettingsSchema = z.object({
	id: z.string().describe('The userId of the user the settings belong to.'),
	currentModule: z.number().optional(),
	labMeta: z.string().optional(),
	preferences: z.string().optional(),
	firstMessage: z.boolean().optional().default(true),
	createdAt: z.string(),
	updatedAt: z.string(),
});
