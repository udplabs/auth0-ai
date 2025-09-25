import { getTransactions as getTransactionsAPI } from '@/lib/api/accounts/get-transactions';
import { ToolResponseSchema } from '@/lib/api/schemas/chat';
import { TransactionSchema } from '@/lib/api/schemas/transactions';
import { getUser } from '@/lib/auth0/client';
import { tool } from 'ai';
import { z } from 'zod';

const inputSchema = z.object({
	accountId: z.string().optional(),
	limit: z.number().optional(),
	startDate: z.string().optional().describe('YYYY-MM-DD'),
	endDate: z.string().optional().describe('YYYY-MM-DD'),
	sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
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
	execute: async (params) => {
		console.info('getTransactions called....');

		try {
			// Resolve the authenticated user (server-only)
			// Throws or returns a user with a stable `sub` (subject) identifier
			const user = await getUser();

			// Fetch transactions for the authenticated user
			const data =
				(await getTransactionsAPI({ userId: user.sub, ...params })) || [];

			// Validate shape: ensures you return strong-typed, safe data to the model/UI
			// This is necessary or Typescript throws a fit.
			const parsed = z.array(TransactionSchema).parse(data);

			// SUCCESS
			return {
				status: 'success',
				data: parsed,
				message: `Found ${parsed.length} transactions for user.`,
				dataCount: parsed.length,
				hasOwnUI: true, // Signals that the UI should render its own component for this tool result
				// When 'hasOwnUI' is true the server will end early to prevent the model from responding.
				// This tool is a PERFECT use case for RSCs. We should switch to RSCs ASAP. :)
			};
		} catch (error: unknown) {
			console.info('error fetching transactions...');
			console.error(error);

			// Normalize to your APIError -> JSON shape, but keep the ToolResponse contract
			const { APIError } = await import('@/lib/errors');

			// DO NOT THROW. Always return a valid ToolResponse.
			// Throwing will cause the entire LLM request to fail.
			// Instead, return a safe error response with no data.
			// The model can decide how to proceed from there.

			return {
				message: 'Failed to fetch transactions.',
				...new APIError(error).toJSON(),
				status: 'error',
				dataCount: 0,
			};
		}
	},
});
