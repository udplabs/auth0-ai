import { Auth0AI, getAccessTokenForConnection } from '@auth0/ai-vercel';
import { FederatedConnectionAuthorizerBase } from '@auth0/ai/FederatedConnections';
import { AccessDeniedInterrupt, CIBAInterrupt } from '@auth0/ai/interrupts';
import type { Tool } from 'ai';
import { getRefreshToken, getUser } from './client';
const auth0AI = new Auth0AI();

// Must manually define type until SDK is updated with exported types
interface AsyncAuthorizerParams<B> {
	audience?: string;
	bindingMessage: (params: B) => Promise<string>;
	scopes: string[];
	tool: Tool;
	onAuthorizationRequest?: 'block' | 'interrupt';
	onUnauthorized?: (e: Error | CIBAInterrupt, ...args: any[]) => Promise<any>;
}

export function withAsyncAuthorization<M>({
	audience,
	bindingMessage,
	onAuthorizationRequest = 'block',
	onUnauthorized,
	scopes = ['openid', 'profile', 'email'],
	tool,
}: AsyncAuthorizerParams<M>) {
	return auth0AI.withAsyncUserConfirmation({
		userID: async () => {
			const user = await getUser();

			return user.sub;
		},
		audience,
		bindingMessage,
		scopes,
		/**
		 * When this flag is set to `block`, the execution of the tool awaits
		 * until the user approves or rejects the request.
		 *
		 * Given the asynchronous nature of the CIBA flow, this mode
		 * is only useful during development.
		 *
		 * In practice, the process that is awaiting the user confirmation
		 * could crash or timeout before the user approves the request.
		 */
		onAuthorizationRequest,
		onUnauthorized:
			onUnauthorized ||
			(async (e) => {
				if (e instanceof AccessDeniedInterrupt) {
					return 'The user has denied the request';
				}
				return e.message;
			}),
	})(tool);
}

// OPTION 1 -- basic implementation
// export const withExternalAccount = auth0AI.withTokenForConnection({
// 	connection: 'bankzero',
// 	connection: 'bank-zero',
// 	scopes: ['read:accounts view:transactions transfer:checking'],
// 	refreshToken: getRefreshToken,
// });

// OPTION 2 -- ability to provide options
interface WithExternalAccountOptions {
	connection?: FederatedConnectionParams['connection'];
	scopes?: FederatedConnectionParams['scopes'];
	credentialsContext?: FederatedConnectionParams['credentialsContext'];
}
export function withExternalAccount(
	tool: Tool,
	options?: WithExternalAccountOptions
) {
	console.log('withExternalAccount called...');
	const {
		connection = 'bankzero',
		// connection = 'bank-zero',
		scopes = [],
		// scopes = ['read:accounts', 'view:transactions', 'transfer:checking'],
		credentialsContext = 'tool-call',
		// connection = 'google-oauth2',
		// scopes = [
		// 	'https://www.googleapis.com/auth/gmail.readonly',
		// 	'https://www.googleapis.com/auth/gmail.compose',
		// 	'https://www.googleapis.com/auth/calendar.events',
		// ],
		// credentialsContext = 'tool-call',
	} = options || {};
	try {
		return auth0AI.withTokenForConnection({
			connection,
			scopes,
			refreshToken: getRefreshToken,
			credentialsContext,
		})(tool);
	} catch (error: unknown) {
		console.error('Error in withExternalAccount');
		console.log(error);
	}
}

export async function getAccessToken() {
	console.log('fetching access token for connection...');
	return getAccessTokenForConnection();
}

// Temporary fix since SDK does not export type
type FederatedConnectionParams = Omit<
	ConstructorParameters<typeof FederatedConnectionAuthorizerBase>[1],
	'store'
>;
