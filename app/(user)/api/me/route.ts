import { type NextRequest, NextResponse } from 'next/server';

import { getUser as getSessionUser } from '@/lib/auth0/client';
import { getUser } from '@/lib/auth0/get-user';
import { APIError } from '@/lib/errors';

// Get user profile
export async function GET(request: NextRequest) {
	try {
		const user = await getSessionUser();
		const userId = user.sub;

		const data = await getUser({ userId });

		return NextResponse.json({ data });
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
