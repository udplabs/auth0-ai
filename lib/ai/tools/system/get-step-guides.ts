import { getUserProfile } from '@/lib/api/user/get-user-profile';
import { getUser } from '@/lib/auth0/client';
import { getStepGuides as getStepGuidesQuery } from '@/lib/db/queries/content';
import { tool } from 'ai';
import { z } from 'zod';
import { ContentSchema, ToolResponseSchema } from '../../schemas';
const inputSchema = z
	.object({
		labStep: z
			.string()
			.optional()
			.describe(
				'The current lab step. If not provided, the current step will be looked up. Lab steps should be provided in `step-01` format.'
			),
	})
	.describe(
		'The current lab step. If not provided, the current step will be looked up. Lab steps should be provided in `step-01` format.'
	);
const outputSchema = ToolResponseSchema(z.array(ContentSchema));

export const getStepGuides = tool<
	z.infer<typeof inputSchema>,
	z.infer<typeof outputSchema>
>({
	name: 'getStepGuides',
	description: `
	This is not a semantic search tool. It is a document retrieval tool. Use this tool to fetch guide content for specific lab steps.

	For example, the user has moved to a new step but then queries about the prior step. Your current prompt would not contain the context of the last step -- inputs for the tool would be key: 'step-01' to retrieve all relevant lab guide content for step 1.

	Step *code* should be retrieved using \`getStepCode\`.

	When possible guides should be presented to the user as-is as markdown or can be used to formulate a more appropriate response based on the situation.

	Content should be sorted alphanumerically based on \`name\`. This is important as some content is sequential!
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
				const content = await getStepGuidesQuery({
					query: labStep,
					contentType: 'guide/step',
				});

				return {
					data: content ? z.array(ContentSchema).parse(content) : [],
					status: 'success',
					dataCount: content.length,
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
