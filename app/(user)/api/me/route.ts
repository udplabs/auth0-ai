import type { UserUpdate } from 'auth0';
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

import { getUserProfile, updateUser } from '@/lib/api/user';
import { getSession, getUser, updateSession } from '@/lib/auth0';
import { APIError } from '@/lib/errors';

// Get user profile
export async function GET() {
	try {
		const user = await getUser();
		const userId = user.sub;

		const data = await getUserProfile({ userId });

		return NextResponse.json(data);
	} catch (error) {
		console.log('API error:', error);
		if (error instanceof APIError) {
			return error.toResponse();
		}
		return new APIError(
			'server_error:api',
			error instanceof Error ? error.message : String(error)
		).toResponse();
	}
}

export async function PATCH(request: NextRequest) {
	try {
		const body = (await request.json()) as UserUpdate;

		const session = await getSession(true);

		const data = await updateUser(session.user.sub, body);

		// Force update the user session
		await updateSession(session);

		// Clear cache (for next request)
		revalidateTag('profile');

		return NextResponse.json({ data });
	} catch (error: unknown) {
		console.log('API error: ', error);
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError('server_error:api', error).toResponse();
	}
}
