// lib/auth0/ai/client.ts
import { Auth0AI } from '@auth0/ai-vercel';

/**
 * Lab Exercise: Implement `withAsyncAuthorization`
 *
 * Goal:
 *  Build a reusable wrapper that applies Auth0 AI’s async user confirmation (CIBA style)
 *  to any protected tool (e.g. transferFunds) while streaming real‑time status to the chat UI.
 */

// ---------------------------------------------------------------------------
// ✅ STEP 1: Define a (mutable) module‑level singleton reference.
//
// This should be familiar if you completed the previous modules.
//
// We have implemented this as part of the lab to make the application more stable.
//
// While this is a good practice, it also introduces unnecessary complexity.
//
// You likely would not do this in a production application.
let singleton: Auth0AI | null;

// ---------------------------------------------------------------------------
// ✅ STEP 2: Create a getter. We are NOT exporting at this time. Instead, we are exporting individual functions.
//
// Usage:
// const auth0AI = await getAuth0AI();
//
// if (!auth0AI) { /* handle missing config */ }
//
// await auth0AI....({ ... });
//
// Behavior:
// - Returns existing singleton if already constructed.
// - Returns null if required env vars are missing (caller must branch).
// - Constructs and caches a new Auth0AI *once*.
//
// ---------------------------------------------------------------------------
export function getAuth0AI() {
	if (!singleton) {
		singleton = new Auth0AI();
	}
	return singleton;
}
