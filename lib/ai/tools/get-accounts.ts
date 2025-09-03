import { tool } from 'ai';
import { z } from 'zod';
import { AccountSchema, ToolResponseSchema } from '../schemas';

/**
 * getAccounts tool
 *
 * Purpose
 * - Fetches the authenticated user's accounts from the API and returns them to the model.
 * - Designed to return data for UI rendering (no text summarization).
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
export const outputSchema = ToolResponseSchema(z.array(AccountSchema));

export const getAccounts = tool<
	z.infer<typeof inputSchema>,
	z.infer<typeof outputSchema>
>({
	name: 'getAccounts',
	description:
		'Fetches existing account data for the authenticated customer. Do not provide text output or summarize the data (unless the user explicitly requested it). The UI will be generated from the tool output',
	inputSchema,
	outputSchema,

	/**
	 * Execute the tool.
	 *
	 * Flow
	 * 1) Resolve the current user from the Auth0 session (server-only).
	 * 2) Fetch accounts for that user from common (cached) service.
	 * 3) Validate the response against AccountSchema[] to guarantee shape.
	 * 4) Return the data in a ToolResponse wrapper.
	 *
	 * Errors
	 * - Any error results in a safe error response with status: 'error' and empty data array.
	 * - Avoid leaking sensitive stack details to the model.
	 */
	execute: async () => {
		console.log('getAccounts tool called');
		try {
			// Defer importing the module (lazy load) until needed. This keeps AI tools "lighter."

			// Resolve the authenticated user (server-only)
			// Throws or returns a user with a stable `sub` (subject) identifier
			const { getUser } = await import('@/lib/auth0');
			const user = await getUser();

			// Fetch accounts for the authenticated user
			const { getAccounts: getAccountsApi } = await import(
				'@/lib/api/accounts'
			);
			const data = await getAccountsApi(user.sub);

			// Validate shape: ensures you return strong-typed, safe data to the model/UI
			// This is necessary or Typescript throws a fit.
			const parsed = z.array(AccountSchema).parse(data);

			// SUCCESS
			return {
				data: parsed,
				status: 'success',
				message: `Found ${data.length} accounts for user.`,
				dataCount: data.length,
				hasOwnUI: true, // Signals that the UI should render its own component for this tool result
				// When 'hasOwnUI' is true the server will end early to prevent the model from responding.
				// This tool is a PERFECT use case for RSCs. We should switch to RSCs ASAP. :)
			};
		} catch (error: unknown) {
			console.log('error fetching accounts...');
			console.log(error);

			// Normalize to your APIError -> JSON shape, but keep the ToolResponse contract
			const { APIError } = await import('@/lib/errors');

			// DO NOT THROW. Always return a valid ToolResponse.
			// Throwing will cause the entire LLM request to fail.
			// Instead, return a safe error response with no data.
			// The model can decide how to proceed from there.
			return {
				...new APIError(error).toJSON(),
				status: 'error',
				message: 'Failed to fetch accounts.',
				dataCount: 0,
			};
		}
	},
});
