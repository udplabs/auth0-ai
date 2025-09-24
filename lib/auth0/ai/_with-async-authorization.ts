// lib/auth0/ai/with-async-authorization.ts
// FINAL CODE
import { getAuth0AI } from '@/lib/auth0/ai/client';
import { handleOnAuthorize } from '@/lib/auth0/ai/handle-on-authorize';
import { getUser } from '@/lib/auth0/client';
import type { TokenSet } from '@auth0/ai';
import type { CIBAAuthorizationRequest } from '@auth0/ai/CIBA';
import {
	AccessDeniedInterrupt,
	CIBAInterrupt,
	UserDoesNotHavePushNotificationsInterrupt,
} from '@auth0/ai/interrupts';
import type { Tool, UIMessageStreamWriter } from 'ai';

// ---------------------------------------------------------------------------
// ✅ STEP 1: Initialize Auth0AI client singleton.
// ---------------------------------------------------------------------------
const auth0AI = getAuth0AI();
// Lab helper.
// If you are seeing this message in the console,
// you did the previous work correctly!
if (auth0AI) {
	console.log('✅ Success! Auth0AI client initialized.');
}

/**
 * LAB TASK: Return a wrapped Auth0AIs `withAsyncConfirmation` wrapper
 *
 * GOAL:
 *  Build a reusable wrapper that applies Auth0 AI’s async user confirmation (CIBA style)
 *  to any protected tool (e.g. transferFunds) while streaming real‑time status to the chat UI.
 *
 * WHY:
 *  This wrapper is key to ensuring that sensitive operations performed on behalf of a user are properly authorized by the user.
 *  By using a standardized authorization flow, we can improve security and user experience.
 *  Additionally, like we have done with the Vercel stream writer, this approach allows us to easily customize the approach for different tools or scenarios in the future.
 *
 * DONE (what has ALREADY been done):
 *  ✔ 1. Initialize auth0AI singleton client.
 *  ✔ 2. Guard against a missing Auth0AI.
 *    ✔ Supplies baseline OIDC scopes (openid, profile, email) [STEP 3]
 *    ✔ Handles an advanced streaming mechanism providing push notification instruction during authorization (`handleOnAuthorize`) [STEP 6]
 *    ✔ Hardcodes an available `bindingMessage` (included in `...options`) [STEP 8]
 *    ✔ Wraps the provided tool [STEP 9]
*
* TODO (what you need to implement):
 *  Return an instance of `auth0AI.withAsyncUserConfirmation`
 *    - [OPTIONAL] Detect specific interrupt types (i.e. `UserDoesNotHavePushNotificationsInterrupt`,
 *      `AccessDeniedInterrupt`) and do something creative (like stream to the user via `writer`).

 *  [BONUS] Externalize `audience` & `scopes` to environment variables (e.g. AUTH0_AUDIENCE, AUTH0_API_SCOPES).
 *
 * ----------------------- * ----------------------- * ----------------------- *
 *
 * SUCCESS CRITERIA:
 *  - You can ask Aiya to transfer $$$ (i.e. `transfer $50 from checking to savings`)
 *  - The first time, if not enrolled in push notifications, you will be prompted to enroll.
 *  - After approval, the transaction seamlessly resumes (or immediately executes) the original tool logic.
 *  - You should see real-time messaging in the chat informing you of progress.
 *
 */
export function withAsyncAuthorization({
	tool,
	writer,
	...options
}: AsyncAuthorizerParams) {
	// ---------------------------------------------------------------------------
	// ✅ STEP 2: Guard! Soft fail if client is not initialized.
	//
	// THIS IS NOT HOW YOU WOULD DO IT IN PRODUCTION
	// We just don't want the lab blowing up before you complete it. :D
	// ---------------------------------------------------------------------------
	if (!auth0AI) {
		console.warn('Auth0AI client not initialized!');
		return;
	}

	// ---------------------------------------------------------------------------
	// HINT: We just checked to ensure `auth0AI` was initialized above. That might be a clue as to what to use...
	// ---------------------------------------------------------------------------

	// ✅ STEP 3: Add newly created scope.
	//
	// TIP: A better practice would be to pull from `process.env.AUTH0_API_SCOPES` or similar.
	const scopes = ['openid', 'profile', 'email', 'create:transfer'];
	return auth0AI.withAsyncUserConfirmation({
		scopes /* ✅ STEP 3 */,
		userID: async () => {
			const user = await getUser();
			return user.sub;
		} /* ✅ STEP 4 */,
		audience: 'http://localhost:3000/api/accounts/transfers' /* ✅ STEP 5 */,
		onAuthorizationRequest: handleOnAuthorize(writer) /* ✅ STEP 6 */,
		onUnauthorized: async (e) => {
			if (e instanceof AccessDeniedInterrupt) {
				// This indicates the user explicitly denied the authorization request.
				// This is where you could place custom logic if you desired
				// or even use the `writer` to send a message to the user.
			}

			if (e instanceof UserDoesNotHavePushNotificationsInterrupt) {
				// This indicates the user does not have MFA push notifications set up.
				// This is where you could place custom logic if you desired
				// or even use the `writer` to send a message to the user.
			}

			// *IMPORTANT*
			//
			// Wrap the error in application's custom API response format and
			// return an appropriate error message.
			//
			// If you do not wrap it in the expected response, the /chat POST
			// handler will not be able to process it correctly (and explode).
			return {
				status: 'error',
				dataCount: 0,
				message: e.message,
				error: e,
			};
		} /* ✅ STEP 7 */,
		...options /* ✅ STEP 8 */,
	})(tool); /* ✅ STEP 9 */
}

// Must manually define type until SDK is updated with exported types
interface AsyncAuthorizerParams {
	audience?: string;
	/**
	 * Only used when using Guardian SDK (but still required by CIBA).
	 */
	bindingMessage: string | ((params: any) => Promise<string>);
	scopes?: string[];
	/**
	 * The actual tool being wrapped
	 */
	tool: Tool;
	onAuthorizationRequest?:
		| 'block'
		| 'interrupt'
		| ((
				authReq: CIBAAuthorizationRequest,
				credentials: Promise<TokenSet | undefined>
		  ) => Promise<void>);
	onUnauthorized?: (e: Error | CIBAInterrupt, ...args: any[]) => Promise<any>;
	/**
	 * Without this, we cannot dynamically update the UI with status messages.
	 */
	writer?: UIMessageStreamWriter;
}
