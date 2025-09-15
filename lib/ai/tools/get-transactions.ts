import { getTransactions as getTransactionsAPI } from '@/lib/api/accounts/get-transactions';
import { getUser } from '@/lib/auth0/client';
import { tool } from 'ai';
import { z } from 'zod';
import { ToolResponseSchema, TransactionSchema } from '../schemas';

const inputSchema = z.object({
	accountId: z.string().optional(),
	limit: z.number().optional(),
});
const outputSchema = ToolResponseSchema(z.array(TransactionSchema));

export const getTransactions = tool<
	z.infer<typeof inputSchema>,
	z.infer<typeof outputSchema>
>({
	description:
		'Fetches existing transaction data for a user by either accountId or userId. If no accountId is provided, it will fetch all transactions for the user.',
	name: 'getTransactions',
	inputSchema,
	outputSchema,
	execute: async ({ accountId, limit }) => {
		console.log('getTransactions called....');

		try {
			const user = await getUser();

			const data =
				(await getTransactionsAPI({ accountId, userId: user.sub, limit })) ||
				[];

			return {
				status: 'success',
				data,
				message: `Found ${data.length} transactions for user.`,
				dataCount: data.length,
				hasOwnUI: true,
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
