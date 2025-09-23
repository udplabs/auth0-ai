import { ToolResponseSchema } from '@/lib/api/schemas/chat';
import { ContentSchema } from '@/lib/api/schemas/content';
import { getUserProfile } from '@/lib/api/user/get-user-profile';
import { getUser } from '@/lib/auth0/client';
import { getStepCode as getStepCodeQuery } from '@/lib/db/queries/content';
import { tool } from 'ai';
import { z } from 'zod';

const inputSchema = z.object({
	labStep: z
		.string()
		.optional()
		.describe(
			'The current lab step. If not provided, the current step will be looked up. Lab steps should be provided in `step-01` format.'
		),
});
const outputSchema = ToolResponseSchema(z.array(ContentSchema));

export const getStepCode = tool<
	z.infer<typeof inputSchema>,
	z.infer<typeof outputSchema>
>({
	name: 'getStepCode',
	description: `
	This tool will retrieve any available reference code for a given step.

	If a user requests to see code for a step, i.e. 'show me the code for step 4' use this tool to fetch the code.

	To fetch guide content use \`getContent\` NOT this tool.

	If no step is provided then the tool will fetch the last known step.

	Present the value of \`textData\` to the end user.
	`.trim(),
	inputSchema,
	outputSchema,
	execute: async ({ labStep }) => {
		try {
			if (!labStep) {
				// Don't throw
				// Content can be retrieved without a user
				const user = await getUser(false);

				if (user?.sub) {
					const { custom_metadata } =
						(await getUserProfile({ userId: user.sub })) || {};

					labStep = custom_metadata?.currentLabStep ?? undefined;
				}
			}

			if (labStep) {
				const content = await getStepCodeQuery(labStep);

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
