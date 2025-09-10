import { NextResponse } from 'next/server';

import { getAuthenticators } from '@/lib/api/user';
import { getUser } from '@/lib/auth0';
import { handleApiError } from '@/lib/errors';
// Get user authenticators
export async function GET() {
	try {
		const user = await getUser();
		const userId = user.sub;

		const data = await getAuthenticators({ userId });

		return NextResponse.json(data);
	} catch (error) {
		return handleApiError(error);
	}
}
