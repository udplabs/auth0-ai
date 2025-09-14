import { getTransactions as getTransactionsAPI } from '@/lib/api/accounts';
import { getUser } from '@/lib/auth0';
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
			const user = await getUser();

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
