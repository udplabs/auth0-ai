import { tool } from 'ai';
import { z } from 'zod';
import { ContentSchema, ToolResponseSchema } from '../../schemas';

const inputSchema = z.object({
	labStep: z
		.stringFormat('step-00', /step-\d{2}/)
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
	This tool will retrieve any available reference code for a given step. If a user requests to see code for a step, i.e. 'show me the code for step 4' use this tool to fetch the code.

	If no step is provided then the tool will fetch the last known step.

	Present the value of \`textData\` to the end user.
	`.trim(),
	inputSchema,
	outputSchema,
	execute: async ({ labStep }) => {
		try {
			const { getStepCode } = await import('@/lib/db/queries/content');
			const { getUser } = await import('@/lib/auth0/client');
			const { getUserProfile } = await import(
				'@/lib/api/user/get-user-profile'
			);

			if (!labStep) {
				// Don't throw
				// Content can be retrieved without a user
				const user = await getUser(false);

				if (user?.sub) {
					const { custom_metadata } =
						(await getUserProfile({ userId: user.sub })) || {};

					labStep = custom_metadata?.labStep;
				}
			}

			if (labStep) {
				const content = await getStepCode(labStep);

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
