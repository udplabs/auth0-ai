import { tool } from 'ai';
import { z } from 'zod';
import { DocumentWithScoreSchema, ToolResponseSchema } from '../schemas';

const outputSchema = ToolResponseSchema(z.array(DocumentWithScoreSchema));

export const ragAccounts = tool<
	{ query: string },
	z.infer<typeof outputSchema>
>({
	description:
		'This tool is used for RAG (Retrieval-Augmented Generation) to fetch existing account and transaction data for the authenticated customer from a local vector store. Unlike `getAccounts` or `getTransactions`, which returns all data belonging to a user, this tool utilizes fine-grained authorization capabilities to ensure that only the authorized account and transaction data is made available for RAG purposes.',
	name: 'ragAccounts',
	inputSchema: z.object({
		query: z.string().describe('The query to search for accounts.'),
	}),
	outputSchema,
	execute: async ({ query }) => {
		console.log('ragAccounts tool called with query:', query);

		const { getUser } = await import('@/lib/auth0');

		const user = await getUser();

		// Wait to import until needed.
		const { FGAFilter } = await import('@auth0/ai');

		const fgaRetriever = FGAFilter.create<Documents.DocumentWithScore>({
			buildQuery: (doc) => ({
				user: `user:${user.sub}`,
				object: `account:${doc.metadata.accountId}`,
				relation: 'can_view_transactions',
			}),
		});

		// Wait to import until needed.
		const { LocalVectorStore } = await import('@/lib/ai/rag/vector-store');

		if (
			LocalVectorStore.initialized === false ||
			LocalVectorStore.count === 0
		) {
			console.log('Vector database not initialized!');
			await LocalVectorStore.init(true);
		}

		const results = await LocalVectorStore.search(query);

		const authorizedResults = await fgaRetriever.filter(results);

		const parsed = DocumentWithScoreSchema.array().parse(authorizedResults);

		return {
			data: parsed,
			status: 'success',
			message: `Found ${authorizedResults.length} accounts for user.`,
			dataCount: authorizedResults.length,
		};
	},
});
