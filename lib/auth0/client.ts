// lib/auth0.ts
import { Auth0Client } from '@auth0/nextjs-auth0/server';
import type { SessionData, User } from '@auth0/nextjs-auth0/types';
import { APIError } from '../errors';

// Dummy default values are set for this demo only.
// Don't do this normally!
export const auth0 = new Auth0Client({
	domain: process.env.AUTH0_DOMAIN || 'your-domain.auth0app.com',
	clientId: process.env.AUTH0_CLIENT_ID || '998877665544',
	clientSecret: process.env.AUTH0_CLIENT_SECRET || '1234567890',
	secret: process.env.AUTH0_SECRET || '987654321987654321',
	authorizationParameters: {
		audience: process.env.AUTH0_AUDIENCE, // e.g. https://calendar-api.tool
		scope: 'openid profile email offline_access',
	},
	appBaseUrl: process.env.AUTH0_BASE_URL || 'http://localhost:3000',
});

export async function updateSession(session: SessionData) {
	await auth0.updateSession(session);
}
export async function getSession(): Promise<SessionData | null>;
export async function getSession(throwError: true): Promise<SessionData>;
export async function getSession(
	throwError?: boolean
): Promise<SessionData | null> {
	const session = await auth0.getSession();

	if (throwError && !session) {
		throw new APIError('unauthorized:auth');
	}

	return session;
}
export async function getRefreshToken() {
	console.log('getRefreshToken called');
	const { tokenSet } = (await getSession()) || {};

	const result = tokenSet?.refreshToken;
	console.log('getRefreshToken result:', result);
	return result;
}

export async function getUser(): Promise<User>;
export async function getUser(throwError: false): Promise<User | undefined>;
export async function getUser(throwError?: boolean): Promise<User | undefined> {
	const { user } = (await getSession()) || {};

	if (throwError && !user?.sub) {
		throw new APIError('unauthorized:auth');
	}

	return user;
}
