import { tool } from 'ai';
import { z } from 'zod';
import { ToolResponseSchema, TransactionSchema } from '../schemas';

const outputSchema = ToolResponseSchema(z.array(TransactionSchema));

export const getTransactions = tool<
	{ accountId?: string },
	z.infer<typeof outputSchema>
>({
	description:
		'Fetches existing transaction data for a user by either accountId or userId. If no accountId is provided, it will fetch all transactions for the user.',
	name: 'getTransactions',
	inputSchema: z.object({
		accountId: z.string().optional(),
	}),
	outputSchema,
	execute: async ({ accountId }) => {
		console.log('getTransactions called....');

		try {
			const { getUser } = await import('@/lib/auth0');

			const user = await getUser();

			// Dynamically import to avoid circular dependencies
			const { getTransactions: getTransactionsAPI } = await import(
				'@/lib/api/accounts'
			);

			const data =
				(await getTransactionsAPI({ accountId, userId: user.sub })) || [];

			return {
				status: 'success',
				data,
				message: `Found ${data.length} transactions for user.`,
				dataCount: data.length,
			};
		} catch (error: unknown) {
			console.log('error fetching transactions...');
			console.log(error);

			// Wait to import
			const { APIError } = await import('@/lib/errors');

			return {
				status: 'error',
				message: 'Failed to fetch transactions.',
				error: new APIError(error).toJSON()?.error,
				dataCount: 0,
			};
		}
	},
});
