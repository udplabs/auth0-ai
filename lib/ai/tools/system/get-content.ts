import { findAllContent, findFirstContent } from '@/lib/db/queries/content';
import { tool } from 'ai';
import { z } from 'zod';
import { ContentSchema, ToolResponseSchema } from '../../schemas';
const inputSchema = z
	.object({
		key: z
			.enum(['name', 'labStep'])
			.optional()
			.describe(
				'The key to search for. Search is limited to only one of these at a time. `labStep` values are formatted as `step-00` (i.e. `step-01` `step-02`, etc.). `name` is searched using `contains`.'
			),
		query: z
			.string()
			.describe('The value to search for against the given key.')
			.optional(),
		contentPlacement: ContentSchema.shape.contentPlacement.optional(),
		contentType: ContentSchema.shape.contentType.optional(),
		find: z
			.enum(['first', 'all'])
			.default('first')
			.describe(
				'Whether to find the first matching content item or all matching items.'
			),
	})
	.describe(
		'Search is performed non-recursively using an AND operator. If multi-parameter search is required, use this tool recursively and change the input.'
	);
const outputSchema = ToolResponseSchema(z.array(ContentSchema));

export const getContent = tool<
	z.infer<typeof inputSchema>,
	z.infer<typeof outputSchema>
>({
	name: 'getContent',
	description: `
	This is not a semantic search tool. It is a document retrieval tool. Use this tool to fetch static content from the database if you lack the necessary content in context.

	For example, the user has moved to a new step but then queries about the prior step. Your current prompt would not contain the context of the last step -- inputs for the tool would be key: 'labStep' and query: 'step-01' to retrieve all content for step 1.

	Content can be of type \`guide\` or \`prompt\` with subtypes (as indicated by the \`contentType\` property).

	Guides should be presented to the user in static form or can be used to formulate a more appropriate response based on the situation.

	Content should be sorted alphanumerically based on \`name\`. This is important as some content is sequential!

	Prompts are ingested as part of the system prompt.

	When fetching content related to a specific step, use \`key: labStep\` . This particular retrieval method is useful for retrieving relevant information to assist users during their lab experience.'
	`.trim(),
	inputSchema,
	outputSchema,
	execute: async ({ find = 'first', ...params }) => {
		try {
			if (find === 'all') {
				const content = (await findAllContent(params)) || [];

				return {
					data: z.array(ContentSchema).parse(content),
					status: 'success',
					dataCount: content.length,
				};
			} else {
				const content = await findFirstContent(params);

				return {
					data: z.array(ContentSchema).parse(!content ? [] : [content]),
					status: 'success',
					dataCount: !content ? 0 : 1,
				};
			}
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
