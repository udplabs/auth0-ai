import { ToolResponseSchema } from '@/lib/api/schemas/chat';
import { ContentSchema } from '@/lib/api/schemas/content';
import { getUserProfile } from '@/lib/api/user/get-user-profile';
import { getUser } from '@/lib/auth0/client';
import { getStepGuides as getStepGuidesQuery } from '@/lib/db/queries/content';
import { tool } from 'ai';
import { z } from 'zod';

const inputSchema = z
	.object({
		labModule: z
			.number()
			.optional()
			.describe(
				'The current lab module. If not provided, the current module will be looked up.'
			),
	})
	.describe(
		'The current lab module. If not provided, the current module will be looked up.'
	);
const outputSchema = ToolResponseSchema(z.array(ContentSchema));

export const getModuleGuides = tool<
	z.infer<typeof inputSchema>,
	z.infer<typeof outputSchema>
>({
	name: 'getModuleGuides',
	description: `
	This is not a semantic search tool. It is a document retrieval tool. Use this tool to fetch guide content for specific lab modules.

	For example, the user has moved to a new module but then queries about the prior module. Your current prompt would not contain the context of the last module -- inputs for the tool would be key: '01' to retrieve all relevant lab guide content for module 1.

	Module *code* should be retrieved using \`getModuleCode\`.

	When possible, guides should be presented to the user as-is as markdown or can be used to formulate a more appropriate response based on the situation.

	Content should be sorted alphanumerically based on \`name\`. This is important as some content is sequential!
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
				const content = await getStepGuidesQuery({
					query: labModule.toString(),
					contentType: 'guide/module',
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
