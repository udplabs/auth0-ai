import { findFirstContent } from '@/lib/db/queries/content';
import { tool } from 'ai';
import { z } from 'zod';
import { ContentSchema, ToolResponseSchema } from '../../schemas';

const inputSchema = z.object({
	filename: z
		.string()
		.describe(
			'The filename to search for. Filenames should include the path but AND the extension (i.e. `lib/auth0/fga/client.ts`)'
		),
});
const outputSchema = ToolResponseSchema(ContentSchema);

export const getReferenceFile = tool<
	z.infer<typeof inputSchema>,
	z.infer<typeof outputSchema>
>({
	name: 'getReferenceFile',
	description: `
	This is not a semantic search tool. It is a file system retrieval tool. Use this tool to fetch a singular file from the database.

	This is useful if a user needs to see the final version of a file or if you need to provide hints to aid in their development.
	`.trim(),
	inputSchema,
	outputSchema,
	execute: async ({ filename }) => {
		try {
			const content = await findFirstContent({
				key: 'filename',
				query: filename.startsWith('src/')
					? filename.replace('src/', '')
					: filename,
			});

			return {
				data: content ? ContentSchema.parse(content) : undefined,
				status: 'success',
				dataCount: !content ? 0 : 1,
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
