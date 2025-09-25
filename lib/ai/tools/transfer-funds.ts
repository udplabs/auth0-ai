// lib/ai/tools/transfer-funds.ts
import { AccountSchema } from '@/lib/api/schemas/accounts';
import { ToolResponseSchema } from '@/lib/api/schemas/chat';
import { CreateTransferSchema } from '@/lib/api/schemas/transfers';
import { tool, type UIMessageStreamWriter } from 'ai';
import { z } from 'zod';

const inputSchema = CreateTransferSchema;

const TransferResultSchema = z.object({
	fromAccount: AccountSchema,
	toAccount: AccountSchema,
});

export const outputSchema = ToolResponseSchema(TransferResultSchema);

/**
 * LAB EXERCISE: Wrap `transferFunds` with newly minted `withAsyncAuthorization`.
 *
 * GOAL:
 * Protect the transferFunds tool with async authorization so that a user is required
 * to approve any transfer performed on their behalf by an agent.
 *
 * WHY:
 * This is important for ensuring that sensitive operations are properly authorized by the user,
 * thereby improving security and user experience.
 *
 * DONE (what has ALREADY been done):
 *  ✔ Core `transferFunds` tool.
 *
 * TODO (what you need to implement):
 *  1. Wrap the existing tool with `withAsyncAuthorization`.
 *     - HINT: You will need to import it from the `auth0` directory.
 *     - You will need to provide the required arguments for `withAsyncAuthorization`.
 *
 *     HINT: `transferFunds` should be the result of invoking `withAsyncAuthorization`.
 *     HINT: `bindingMessage` can be a simple string like "Please approve the transfer".
 *     HINT: Refer back to the interface from `withAsyncAuthorization` if you are not sure what arguments to pass.
 *
 *  2. Retrieve an access token using `getCIBACredentials` and add the `accessToken` to the Authorization header as a Bearer token.
 *     - HINT: You will need to import it from `auth0@ai-vercel`.
 *
 * 3. Update the tool description.
 *    - Remove the instructions to always require confirmation and, instead, tell Aiya to NEVER ask for confirmation as a push notification will be sent.
 *    - How will you word it? There's not a wrong answer!
 *
 * 		HINT: AI models respond well to simple, concise, but explicit instructions. This is not your best friend -- just tell it what to do (or NOT do).
 *
 *  4. Transform the wrapper into a higher-order factory that accepts a Vercel datastream `writer`.
 *     - Be sure to pass the `writer` along. Free rides for writers! 🚙
 *
 *     HINT: `transferFunds` should now return a function that invokes `withAsyncAuthorization`.
 *     HINT: Refer back to the interface from `withAsyncAuthorization` if you are not sure what arguments to pass.
 *
 * SUCCESS CRITERIA:
 *  - You can ask Aiya to transfer $$$ (i.e. `transfer $50 from checking to savings`)
 *  - The first time, if not enrolled in push notifications, you will be prompted to enroll.
 *  - After approval, the transaction seamlessly resumes (or immediately executes) the original tool logic.
 *  - You should see real-time messaging in the chat informing you of progress.
 */
export const transferFunds =
	/* ⚠️ TASK 8: Transform into higher-order factory (wrap `withAsyncAuthorization`)*/
	/* ❌ TASK 7 - STEP 1: Wrap with `withAsyncAuthorization` */ tool<
		z.infer<typeof inputSchema>,
		z.infer<typeof outputSchema>
	>({
		name: 'transferFunds',
		// ❌ TASK 7 - STEP 3: Update the tool description.
		description:
			'Use this tool to transfer funds on behalf of a user. It requires both the to and from internal account identifiers (ULIDs) in addition to the fully qualified account numbers. DO NOT ASK THE USER FOR ACCOUNT NUMBERS OR IDs. Use `getAccountList` to fetch the necessary data and determine which accounts based on `name` and `displayName`. If still unable to determine the specific account, ask for clarification for that account only. Always confirm the details of the transfer with the user before continuing.',
		inputSchema,
		outputSchema,
		execute: async (payload) => {
			try {
				// ---------------------------------------------------------------------------
				// ❌ TASK 7 - STEP 2: Retrieve access token using `getCIBACredentials` and add to Authorization header.
				// You will need to:
				// - Import `getCIBACredentials` from `@auth0/ai-vercel`
				// - Call the method to get a TokenSet (and accessToken).
				//---------------------------------------------------------------------------

				const response = await fetch(
					`${process.env.APP_BASE_URL}/api/accounts/${payload.fromAccountId}`,
					{
						method: 'POST',
						headers: {
							// ❌ TASK 7 - STEP 2: Ensure the accessToken is sent to the API
							Authorization: `Bearer `,
						},
						body: JSON.stringify(payload),
					}
				);

				if (!response.ok) {
					throw new Error(`API responded with status ${response.status}`);
				}

				return {
					status: 'success',
					message: 'Transfer successful.',
					dataCount: 1,
					data: TransferResultSchema.parse(await response.json()),
				};
			} catch (error: unknown) {
				console.info('error creating transfer...');
				console.error(error);

				const { APIError } = await import('@/lib/errors');

				return {
					...new APIError(error).toJSON(),
					status: 'error',
					message: 'Failed to create transfer.',
					dataCount: 0,
				};
			}
		},
	});
