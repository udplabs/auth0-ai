// lib/auth0.ts
import { Auth0Client } from '@auth0/nextjs-auth0/server';
import type { User } from '@auth0/nextjs-auth0/types';
import { NextResponse } from 'next/server';
import { APIError } from '../errors';

export const auth0 = new Auth0Client({
	authorizationParameters: {
		audience: process.env.AUTH0_AUDIENCE, // e.g. https://calendar-api.tool
		scope: 'openid profile email offline_access read:calendar write:calendar',
	},
	appBaseUrl: process.env.AUTH0_BASE_URL,
	onCallback: async (error, context, session) => {
		console.log('=== Auth0 callback ===');
		console.log('context');
		console.log(context);
		console.log('session');
		console.log(session);

		return NextResponse.redirect(
			new URL(context.returnTo || '/', process.env.APP_BASE_URL)
		);
	},
});
export async function getRefreshToken() {
	console.log('getRefreshToken called');
	const { tokenSet } = (await auth0.getSession()) || {};

	const result = tokenSet?.refreshToken;
	console.log('getRefreshToken result:', result);
	return result;
}

export async function getUser(): Promise<User>;
export async function getUser(throwError: false): Promise<User | undefined>;
export async function getUser(throwError?: boolean): Promise<User | undefined> {
	const { user } = (await auth0.getSession()) || {};

	if (throwError && !user?.sub) {
		throw new APIError('unauthorized:auth');
	}

	return user;
}
