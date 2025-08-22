import { AccountSchema, ToolResponseSchema } from '@/lib/ai/schemas';
import { withExternalAccount } from '@/lib/auth0/ai';
import { APIError } from '@/lib/errors';
import { FederatedConnectionError } from '@auth0/ai/interrupts';
import { tool } from 'ai';
import { z } from 'zod';

const outputSchema = ToolResponseSchema(z.array(AccountSchema));

export const getExternalAccounts = withExternalAccount(
	tool<object, z.infer<typeof outputSchema>>({
		description:
			'Attempts to retrieve account and transaction data from an external bank account. Uses the `withExternalAccount` wrapper that utilizes Auth0 AI`s `withTokenForConnection` method. If the user has not previously connected their account, the tool call will be interrupted and the user required to authorize their external account. During that process the primary user account and external account will be linked together via an Auth0 Action. Upon completion, this tool will continue to run and the API call to the external API should succeed.',
		name: 'getExternalAccounts',
		inputSchema: z.object({}),
		outputSchema,
		execute: async () => {
			console.log('getExternalAccounts tool called');

			const { getAccessToken } = await import('@/lib/auth0/ai');
			const { getUser } = await import('@/lib/auth0/client');
			const { createAccounts } = await import('@/lib/db/services/accounts');
			const { getExternalAccountsByUserId } = await import(
				'@/lib/db/queries/accounts'
			);

			const user = await getUser();

			// 1) Fetch an access token from the Auth0 token vault.
			const accessToken = await getAccessToken();

			console.log(accessToken);

			try {
				// 2) Check locally first. Accounts may have already been fetched.
				let data = await getExternalAccountsByUserId(user.sub);

				if (data.length === 0) {
					console.log(
						'No external accounts found locally, fetching from external bank API...'
					);

					const url = `https://bank.auth.rocks/api/v1/accounts?include_transactions=true`;

					const res = await fetch(url, {
						method: 'GET',
						headers: {
							Authorization: `Bearer ${accessToken}`,
							'Content-Type': 'application/json',
						},
					});

					if (!res.ok) {
						const resText = await res.text();
						console.log('Bank API error response', res.status, resText);
						if (res.status === 401 || res.status === 403) {
							throw new FederatedConnectionError(
								'Access to the external bank account was unauthorized. Please reconnect your external account.'
							);
						}
						throw new APIError(
							`unknown:api`,
							`${res.status} - ${resText}`
						).toJSON();
					}

					const body = (await res.json()) as Accounts.Account[];

					// Create the accounts to persist locally
					data = await createAccounts({
						userId: user.sub,
						accounts: body.map(({ transactions = [], ...account }) => ({
							...account,
							isExternal: true,
							externalConnectionId: 'bank-zero',
							externalConnectionName: 'Bank Zero',
							transactions:
								transactions.map((tx) => ({
									...tx,
									isExternal: true,
									externalConnectionId: 'bank-zero',
									externalConnectionName: 'Bank Zero',
								})) || [],
						})),
						createEmbeddings: true,
					});
				}

				const parsed = z.array(AccountSchema).parse(data);

				return {
					data: parsed,
					status: 'success',
					message: `Found ${data.length} external accounts.`,
					dataCount: data.length,
					hasOwnUI: true,
				};
			} catch (error: unknown) {
				console.log('error fetching external accounts...');
				console.log(error);
				if (error instanceof FederatedConnectionError) {
					throw error; // Re-throw to be handled by the interrupt
				}
				return {
					status: 'error',
					message: 'Failed to fetch external accounts.',
					error: new APIError(error).toJSON()?.error,
					dataCount: 0,
				};
			}
		},
	})
);
