import { tool } from 'ai';
import { z } from 'zod';
import { SettingsSchema, ToolResponseSchema } from '../../schemas';

const outputSchema = ToolResponseSchema(SettingsSchema);
const inputSchema = z.object({
	currentLabStep: z.string().optional(),
	nextLabStep: z.string().optional(),
	labMeta: z.string().optional(),
	userId: z.string().optional(),
});

export const userSettings = tool<
	z.infer<typeof inputSchema>,
	z.infer<typeof outputSchema>
>({
	name: 'userSettings',
	description:
		'This tool is to upsert user settings for a specific user. When a user initially begins the lab they will not have any details and will not have sent a message. This tool requires authentication. As you learn what step of the lab a user is currently on, or any other relevant information, use this tool to update the database. The `labMeta` field is for any content/values you determine to be of interest in order to better assist the user in the lab. Use it at your own discretion as a "memory" of sorts.',
	inputSchema,
	outputSchema,
	execute: async ({
		currentLabStep = 'step-0',
		nextLabStep = null,
		labMeta = null,
		userId: user_id,
	}) => {
		try {
			const { getUser } = await import('@/lib/auth0');

			const userId = !user_id ? (await getUser()).sub : user_id;

			const { upsertSettings } = await import('@/lib/db/queries/settings');

			const settings = await upsertSettings({
				id: userId,
				currentLabStep,
				nextLabStep,
				labMeta,
			});

			return {
				data: SettingsSchema.parse(settings),
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
