'use server';

import { CredentialsMethod, OpenFgaClient } from '@openfga/sdk';

export async function create() {
	return new OpenFgaClient({
		apiUrl: process.env.FGA_API_URL ?? 'https://api.us1.fga.dev',
		storeId: process.env.FGA_STORE_ID,
		authorizationModelId: process.env.FGA_MODEL_ID,
		credentials: {
			method: CredentialsMethod.ClientCredentials,
			config: {
				apiTokenIssuer: process.env.FGA_API_TOKEN_ISSUER ?? 'auth.fga.dev',
				apiAudience: process.env.FGA_API_AUDIENCE ?? 'https://api.us1.fga.dev/',
				clientId: process.env.FGA_CLIENT_ID,
				clientSecret: process.env.FGA_CLIENT_SECRET,
			},
		},
	});
}

let instance: OpenFgaClient | null = null;

export async function getFgaClient(): Promise<OpenFgaClient | null> {
	if (process.env.FGA_STORE_ID && !instance) {
		instance = await create();
	} else {
		console.warn(
			'Unable to initialize FGA Client! Double check your configuration.'
		);
	}
	return instance;
}
