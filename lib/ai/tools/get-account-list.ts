// lib/ai/tools/get-account-list.ts
import { listAccounts } from '@/lib/api/accounts/get-accounts';
import { AccountListSchema } from '@/lib/api/schemas/accounts';
import { ToolResponseSchema } from '@/lib/api/schemas/chat';
import { getUser } from '@/lib/auth0/client';
import { tool } from 'ai';
import { z } from 'zod';
/**
 * getAccounts tool
 *
 * Purpose
 * - Fetches a list of authenticated user's accounts from the API and returns them to the model.
 *
 * Contract
 * - input: no parameters (must be authenticated via session)
 * - output: ToolResponse<{ data: Account[] }>
 */

// Explicit empty input schema so we can infer its type and evolve later.
const inputSchema = z.object();

/**
 * Output schema:
 * - Base response wrapper (status + data) around an array of AccountSchema
 */
const outputSchema = ToolResponseSchema(z.array(AccountListSchema));

export const getAccountList = tool<
	z.infer<typeof inputSchema>,
	z.infer<typeof outputSchema>
>({
	name: 'getAccountList',
	description:
		'Use this tool to retrieve the necessary account data to initiate a funds transfer. The user will typically provide the account name(s) and you will need to obtain the actual `id` and `number` to use the `transferFunds` tool.',
	inputSchema,
	outputSchema,

	/**
	 * Execute the tool.
	 *
	 * Flow
	 * 1) Resolve the current user from the Auth0 session (server-only).
	 * 2) Fetch accounts for that user from common (cached) service.
	 * 2) Accounts are reduced to a minimal shape.
	 * 3) Validate the response against AccountListSchema[] to guarantee shape.
	 * 4) Return the data in a ToolResponse wrapper.
	 *
	 * Errors
	 * - Any error results in a safe error response with status: 'error' and empty data array.
	 * - Avoid leaking sensitive stack details to the model.
	 */
	execute: async () => {
		console.info('getAccountList tool called');
		try {
			// Resolve the authenticated user (server-only)
			// Throws or returns a user with a stable `sub` (subject) identifier
			const user = await getUser();

			// Fetch accounts for the authenticated user
			const data = await listAccounts(user.sub);

			// Validate shape: ensures you return strong-typed, safe data to the model/UI
			// This is necessary or Typescript throws a fit.
			const parsed = z.array(AccountListSchema).parse(data);

			// SUCCESS
			return {
				data: parsed,
				status: 'success',
				message: `Found ${data.length} accounts for user.`,
				dataCount: data.length,
			};
		} catch (error: unknown) {
			console.info('error fetching account list...');
			console.error(error);

			// Normalize to APIError -> JSON shape, but keep the ToolResponse contract
			const { APIError } = await import('@/lib/errors');

			// DO NOT THROW. Always return a valid ToolResponse.
			// Throwing will cause the entire LLM request to fail.
			// Instead, return a safe error response with no data.
			// The model can decide how to proceed from there.
			return {
				message: 'Failed to fetch account list.',
				...new APIError(error).toJSON(),
				status: 'error',
				dataCount: 0,
			};
		}
	},
});
