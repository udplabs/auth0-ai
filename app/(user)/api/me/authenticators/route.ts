import { NextResponse } from 'next/server';

import { getAuthenticators } from '@/lib/api/user';
import { getUser } from '@/lib/auth0';
import { APIError } from '@/lib/errors';

// Get user authenticators
export async function GET() {
	try {
		const user = await getUser();
		const userId = user.sub;

		const data = await getAuthenticators({ userId });

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
