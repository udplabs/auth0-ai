// lib/auth0/client.ts
import { Auth0Client } from '@auth0/nextjs-auth0/server';
import type { SessionData, User } from '@auth0/nextjs-auth0/types';
import { APIError } from '../errors';
/**
 * Auth0 server helpers used by the lab.
 *
 * What this module provides
 * - A pre-configured Auth0Client instance for server-side usage.
 * - Small utilities to read/update the current session and user.
 * - A convenience getter for the refresh token (if configured).
 *
 * Important
 * - This file must only run on the server. Do not import it in Client Components.
 * - In production environments it is NOT necessary to explicitly pass parameters.
 * - The default env fallbacks are for lab/demo only. In real apps, require all envs.
 * -
 * See https://auth0.github.io/nextjs-auth0 for full documentation.
 *
 * Environment variables
 * - AUTH0_DOMAIN               (required)
 * - AUTH0_CLIENT_ID            (required)
 * - AUTH0_CLIENT_SECRET        (required; server only)
 * - AUTH0_SECRET               (required; cookie/session encryption)
 * - AUTH0_AUDIENCE             (optional; API audience for access tokens)
 * - AUTH0_BASE_URL             (required in production; e.g., https://your-app.com)
 *
 * Error handling
 * - getSession(true) and getUser(true) throw APIError('unauthorized:auth') if missing.
 * - getSession() and getUser() return null/undefined instead of throwing.
 */

/**
 * Server-side Auth0 client used to read/update the session.
 *
 * Implementation using `getAuth0Client()` for demo purposes only.
 * Notes
 * - authorizationParameters.scope includes offline_access so a refresh token may be issued.
 * - appBaseUrl must match your deployed URL in production.
 */
export const auth0 = getAuth0Client();

// =========== The following are helper functions/wrappers around ===========
// =========== auth0 methods to avoid exposing `auth0` directly.  ===========

/**
 * Persist changes to the current session.
 *
 * Typical use
 * - After refreshing tokens or modifying custom session properties.
 */
export async function updateSession(session: SessionData) {
	if (!auth0) {
		return;
	}
	await auth0.updateSession(session);
}

/**
 * Get the current server session.
 *
 * Overloads
 * - getSession(): Promise<SessionData | null> — returns null when not authenticated.
 * - getSession(true): Promise<SessionData>   — throws APIError('unauthorized:auth') when missing.
 */
export async function getSession(): Promise<SessionData>;
export async function getSession(
	throwError: false
): Promise<SessionData | null>;
export async function getSession(
	throwError = false
): Promise<SessionData | null> {
	if (!auth0) {
		return null;
	}
	const session = await auth0.getSession();

	if (throwError && !session) {
		throw new APIError('unauthorized:auth');
	}

	return session;
}

/**
 * Get the authenticated user from the current session.
 * Returns id_token claims -- essentially a userinfo call.
 * Use userUserProfile() to get the full user profile from the Management API.
 *
 * Overloads
 * - getUser(): Promise<User | undefined>          — returns undefined when not authenticated.
 * - getUser(true): Promise<User>                  — throws APIError('unauthorized:auth') when missing.
 */
export async function getUser(): Promise<User>;
export async function getUser(throwError: false): Promise<User | undefined>;
export async function getUser(throwError = true): Promise<User | undefined> {
	if (!auth0) {
		return;
	}

	const { user } = (await getSession()) || {};

	if (throwError && !user?.sub) {
		throw new APIError('unauthorized:auth');
	}

	return user;
}

//===============================================

/**
 *
 * Helper function to help the demo app.
 * This permits the app to run without Auth0 being configured yet.
 *
 * WE DO NOT ADVISE DOING THIS IN PRODUCTION!
 *
 * This is only for development purposes.
 */
function getAuth0Client() {
	const domain = process.env.AUTH0_DOMAIN;
	const clientId = process.env.AUTH0_CLIENT_ID;
	const clientSecret = process.env.AUTH0_CLIENT_SECRET;
	const secret = process.env.AUTH0_SECRET;
	const authorizationParameters = {
		audience: process.env.AUTH0_AUDIENCE, // e.g. https://your-api.example.com
		scope: 'openid profile email offline_access',
	};
	const appBaseUrl = process.env.AUTH0_BASE_URL || 'http://localhost:3000';

	if (!(domain && clientId && clientSecret && secret)) {
		console.warn('Auth0 client not yet initialized. Follow the lab guide!');
		return null;
	}

	return new Auth0Client({
		domain,
		clientId,
		clientSecret,
		secret,
		authorizationParameters,
		appBaseUrl,
	});
}
