// lib/auth0/fga/client.ts
// FINAL CODE
'use server';

import {
	CredentialsMethod,
	OpenFgaClient,
	type UserClientConfigurationParams,
} from '@openfga/sdk';

/**
 * Lab Exercise: Implement an OpenFGA client factory.
 *
 * What you will build
 * - A lazily‑initialized singleton OpenFgaClient used by server code (tools, APIs).
 *
 * Why
 * - Centralizes configuration (env vars, credentials).
 * - Prevents recreating clients on every request in the Node runtime.
 *
 * This file has been intentionally “de‑scaffolded”.
 * You must replace the pseudo‑code with real implementation.
 *
 * ---------------------------------------------------------------------------
 * 1. Install dependency
 *    `pnpm add @openfga/sdk`
 *
 * 2. Required environment variables:
 *    FGA_STORE_ID=           # Your store UUID
 *    FGA_CLIENT_ID=          # From FGA Console (Machine-to-Machine)
 *    FGA_CLIENT_SECRET=      # From FGA Console
 *    FGA_API_URL=            # Default: https://api.us1.fga.dev
 *    FGA_API_TOKEN_ISSUER=   # Default: auth.fga.dev
 *    FGA_API_AUDIENCE=       # Default: https://api.us1.fga.dev/
 *
 * 3. High‑level flow:
 *    - getFgaClient() called somewhere (e.g., inside a tool).
 *    - If singleton not created: build a new OpenFgaClient with client credentials.
 *    - Return the cached instance thereafter.
 *
 * 4. Error handling:
 *    - For this demo app, if critical env vars are missing, return null and log a warning (don’t throw hard).
 *    - For production, recommend throwing and/or alerting if config is incomplete.
 *
 * 5. Common mistakes (watch out):
 *    - Forgetting to guard multiple initializations.
 *    - Logging secrets (DO NOT log clientSecret).
 *    - Using the client before env vars are loaded.
 */

// ---------------------------------------------------------------------------
// ✅ STEP 1: Define a (mutable) module‑level singleton reference.
// ---------------------------------------------------------------------------

let singleton: OpenFgaClient | null = null;

// ---------------------------------------------------------------------------
// ❌ STEP 2: Create (internal) FGA client. Keep separate from public getter so you
// can add retries / backoff later if desired.

// NOTE: If you are not familiar with NextJS -- be advised that ENV vars must be accessed inline as `process.env.{var}` and not via object destructuring.
// ---------------------------------------------------------------------------
export async function createClient() {
	try {
		const options: UserClientConfigurationParams = {
			apiUrl: process.env.FGA_API_URL,
			storeId: process.env.FGA_STORE_ID,
			authorizationModelId: process.env.FGA_MODEL_ID,
			credentials: {
				method: CredentialsMethod.ClientCredentials,
				config: {
					apiTokenIssuer: process.env.FGA_API_TOKEN_ISSUER,
					apiAudience: process.env.FGA_API_AUDIENCE,
					clientId: process.env.FGA_CLIENT_ID,
					clientSecret: process.env.FGA_CLIENT_SECRET,
				},
			},
		};

		return new OpenFgaClient(options);
	} catch (error: unknown) {
		console.warn('FGA Client initialization failed!');
		console.warn(error);
		return null;
	}
}

// ---------------------------------------------------------------------------
// ✅ STEP 3: Export a public getter.
//
// Usage:
// const fga = await getFgaClient();
//
// if (!fga) { /* handle missing config */ }
//
// await fga.check({ ... });
//
// Behavior:
// - Returns existing singleton if already constructed.
// - Returns null if required env vars are missing (caller must branch).
// - Constructs and caches a new OpenFgaClient *once*.
//
// ---------------------------------------------------------------------------
export async function getFgaClient(): Promise<OpenFgaClient | null> {
	if (!singleton) {
		singleton = await createClient();
	}

	return singleton;
}
