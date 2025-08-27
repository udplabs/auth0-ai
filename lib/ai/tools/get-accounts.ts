import { tool } from 'ai';
import { z } from 'zod';
import { AccountSchema, ToolResponseSchema } from '../schemas';

export const outputSchema = ToolResponseSchema(z.array(AccountSchema));

export const getAccounts = tool<object, z.infer<typeof outputSchema>>({
	description:
		'Fetches existing account data for the authenticated customer. Do not provide text output or summarize the data (unless the user explicitly requested it). The UI will be generated from the tool output',
	name: 'getAccounts',
	inputSchema: z.object(),
	outputSchema,
	execute: async () => {
		console.log('getAccounts tool called');

		const { getUser } = await import('@/lib/auth0');

		const user = await getUser();

		// Wait to import until needed
		const { getAccounts: getAccountsApi } = await import('@/lib/api/accounts');

		try {
			const data = await getAccountsApi(user.sub);

			const parsed = z.array(AccountSchema).parse(data);

			return {
				data: parsed,
				status: 'success',
				message: `Found ${data.length} accounts for user.`,
				dataCount: data.length,
				hasOwnUI: true,
			};
		} catch (error: unknown) {
			console.log('error fetching accounts...');
			console.log(error);

			const { APIError } = await import('@/lib/errors');

			return {
				status: 'error',
				message: 'Failed to fetch accounts.',
				error: new APIError(error).toJSON()?.error,
				dataCount: 0,
			};
		}
	},
});
