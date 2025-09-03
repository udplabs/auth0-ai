import { tool } from 'ai';
import { z } from 'zod';
import { ContentSchema, ToolResponseSchema } from '../../schemas';

const inputSchema = z
	.object({
		id: z.string().optional(),
		name: ContentSchema.shape.name.optional(),
		filename: z
			.string()
			.optional()
			.describe(
				'The filename to search for if contentType is `reference/code`.'
			),
		step: z
			.string()
			.optional()
			.describe(
				'The current step of the lab. File names in the database relating to steps are prefixed with the step they belong to. i.e. `step-03_post-auth`. Sending this value results in a `name.startsWith(step)` form of query.'
			),
		type: ContentSchema.shape.type.optional(),
		contentType: ContentSchema.shape.contentType.optional(),
		find: z
			.enum(['first', 'all'])
			.default('first')
			.describe(
				'Whether to find the first matching content item or all matching items.'
			),
	})
	.describe(
		'The input schema mirrors the database search parameters. Search is performed non-recursively in the following order: id, name, contentType, step, type. The first valid search parameter is used and the rest discarded. If multi-parameter search is required, use this tool recursively and change the input.'
	);
const outputSchema = ToolResponseSchema(z.array(ContentSchema));

export const getContent = tool<
	z.infer<typeof inputSchema>,
	z.infer<typeof outputSchema>
>({
	name: 'getContent',
	description: `
	This is not a semantic search tool. It is a file retrieval tool. Use this tool to fetch static content from the database if you lack the necessary content in context.

	For example, the user has moved to a new step but then queries about the prior step. Your current prompt would not contain the context of the last step.

	Another high-value use case would be accessing reference code snippets to provide hints to the developer.

	Content can be of type \`guide\` or \`prompt\` with subtypes (as indicated by the \`contentType\` property).

	Guides should be presented to the user in static form or can be used to formulate a more appropriate response based on the situation.

	Content is identified by its \`name\` property, which may include a step prefix if the contentType is of \`guide/step\` (e.g., \`step-01_welcome\`).

	Content should be sorted alphanumerically based on \`name\`. This is important as some content is sequential!

	Prompts are ingested as part of the system prompt.

	When fetching content related to a specific step, use the \`step\` parameter to match names that start with that step prefix. This particular retrieval method is useful for retrieving relevant information to assist users during their lab experience.'

	If the \`filename\` parameter is provided, it will be used to match the filename of the content -- no other parameter will be used.
	`.trim(),
	inputSchema,
	outputSchema,
	execute: async ({ find = 'first', id, ...params }) => {
		try {
			const { findFirstContent, findAllContent } = await import(
				'@/lib/db/queries/content'
			);

			if (find === 'all') {
				const content = (await findAllContent(params)) || [];

				return {
					data: z.array(ContentSchema).parse(content),
					status: 'success',
					dataCount: content.length,
				};
			} else {
				const content = await findFirstContent({
					id,
					...params,
				});

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
