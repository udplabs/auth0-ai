// lib/auth0/fga/client.ts
'use server';

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
 * 2. Required environment variables (add to .env.local for local dev):
 *    FGA_API_URL=            # e.g. https://api.us1.fga.dev
 *    FGA_STORE_ID=           # Your store UUID
 *    FGA_MODEL_ID=           # (Optional) Authorization Model ID (omit to always use latest)
 *    FGA_CLIENT_ID=          # From FGA Console (Machine-to-Machine)
 *    FGA_CLIENT_SECRET=      # From FGA Console
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

import { OpenFgaClient, type ClientConfiguration } from '@openfga/sdk';

// ---------------------------------------------------------------------------
// ✅ STEP 1: Define a (mutable) module‑level singleton reference.
// ---------------------------------------------------------------------------

let singleton: OpenFgaClient | null = null;

// ---------------------------------------------------------------------------
// ❌ STEP 2: Build client options (WITHOUT secrets logged).
// You may choose to omit authorizationModelId so the SDK always uses the latest model.
//
// NOTE: Do NOT console.log secrets.
// NOTE: If you are not familiar with NextJS -- be advised that ENV vars must be accessed inline as `process.env.{var}` and not via object destructuring.
// ---------------------------------------------------------------------------
function buildOptions() {
	return {
		// TODO: ... Get options from .env
	} as ClientConfiguration;
}

// ---------------------------------------------------------------------------
// ❌ STEP 4: Create (internal) client. Keep separate from public getter so you
// can add retries / backoff later if desired.
// ---------------------------------------------------------------------------
export async function createClient() {
	try {
		const options = buildOptions();

		// TODO: Initialize FGA client

		return null; // Return the client
	} catch (error: unknown) {
		console.warn('FGA Client initialization failed!');
		console.warn(error);
		return null;
	}
}

// ---------------------------------------------------------------------------
// ✅ STEP 5: Public getter.
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
