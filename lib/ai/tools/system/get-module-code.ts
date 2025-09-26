import { ToolResponseSchema } from '@/lib/api/schemas/chat';
import { ContentSchema } from '@/lib/api/schemas/content';
import { getUserProfile } from '@/lib/api/user/get-user-profile';
import { getUser } from '@/lib/auth0/client';
import { getModuleCode as getModuleCodeQuery } from '@/lib/db/queries/content';
import { tool } from 'ai';
import { z } from 'zod';

const inputSchema = z.object({
	labModule: z
		.number()
		.optional()
		.describe(
			'The current lab module. If not provided, the current module will be looked up.'
		),
});
const outputSchema = ToolResponseSchema(z.array(ContentSchema));

export const getModuleCode = tool<
	z.infer<typeof inputSchema>,
	z.infer<typeof outputSchema>
>({
	name: 'getModuleCode',
	description: `
	This tool will retrieve any available reference code for a given module.

	If a user requests to see code for a module, i.e. 'show me the code for module 4' use this tool to fetch the code.

	To fetch guide content use \`getContent\` NOT this tool.

	If no module is provided then the tool will fetch the last known module.

	Present the value of \`textData\` to the end user.
	`.trim(),
	inputSchema,
	outputSchema,
	execute: async ({ labModule }) => {
		try {
			if (!labModule) {
				// Don't throw
				// Content can be retrieved without a user
				const user = await getUser(false);

				if (user?.sub) {
					const { custom_metadata } =
						(await getUserProfile({ userId: user.sub })) || {};

					labModule = custom_metadata?.currentModule ?? undefined;
				}
			}

			if (labModule) {
				const content = await getModuleCodeQuery(labModule.toString());

				return {
					data: content ? z.array(ContentSchema).parse(content) : undefined,
					status: 'success',
					dataCount: !content ? 0 : 1,
				};
			}
			return {
				status: 'error',
				message: 'No lab step provided and unable to determine current step.',
				dataCount: 0,
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
