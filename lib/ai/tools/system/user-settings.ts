import { tool } from 'ai';
import { z } from 'zod';
import { SettingsSchema, ToolResponseSchema } from '../../schemas';

const outputSchema = ToolResponseSchema(SettingsSchema);
const inputSchema = z.object({
	action: z.enum(['get', 'set']).describe('The action to perform.'),
	currentLabStep: z.string().optional(),
	labMeta: z.string().optional(),
	userId: z.string().optional(),
	firstMessage: z.boolean().optional(),
});

export const userSettings = tool<
	z.infer<typeof inputSchema>,
	z.infer<typeof outputSchema>
>({
	name: 'userSettings',
	description:
		'This tool is to set/get user settings for a specific user. When a user initially begins the lab they will not have any details and will not have sent a message. The client will automatically send the first message and before responding update the database to indicate `firstMessage: false`. This tool requires authentication. As you learn what step of the lab a user is currently on use this tool to update the database. The `meta` field is for any content/values you determine to be of interest in order to better assist the user in the lab. Use it at your own discretion as a "memory" of sorts.',
	inputSchema,
	outputSchema,
	execute: async ({
		action,
		currentLabStep = 'step_0',
		labMeta = null,
		userId: user_id,
		firstMessage = false,
	}) => {
		try {
			const { getUser } = await import('@/lib/auth0');

			const userId = !user_id ? (await getUser()).sub : user_id;

			if (action === 'set') {
				const { saveSettings } = await import('@/lib/db/queries/settings');

				const settings = await saveSettings({
					id: userId,
					currentLabStep,
					labMeta,
					preferences: null,
					firstMessage,
				});

				return {
					data: SettingsSchema.parse(settings),
					status: 'success',
					dataCount: 1,
				};
			}

			const { getSettings } = await import('@/lib/db/queries/settings');

			const settings = (await getSettings(userId)) || null;

			return {
				data: settings ? SettingsSchema.parse(settings) : undefined,
				status: 'success',
				dataCount: 1,
			};
		} catch (error: unknown) {
			const { APIError } = await import('@/lib/errors');

			return {
				...new APIError(error).toJSON(),
				status: 'error',
				dataCount: 0,
			};
		}
	},
});
