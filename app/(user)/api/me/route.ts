import { getUserProfile } from '@/lib/api/user/get-user-profile';
import { updateUser } from '@/lib/api/user/update-user';
import { getSession, getUser, updateSession } from '@/lib/auth0/client';
import { handleApiError } from '@/lib/errors';
import { getSearchParams } from '@/lib/utils/get-search-params';
import type { UserUpdate } from 'auth0';
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

// Get user profile
export async function GET(request: NextRequest) {
	try {
		const user = await getUser();
		const userId = user.sub;

		const { cached } = getSearchParams<{ cached?: boolean }>(request, [
			'cached',
		]);

		const data = await getUserProfile({ userId, cached });

		return NextResponse.json(data);
	} catch (error) {
		return handleApiError(error);
	}
}

export async function PATCH(request: NextRequest) {
	try {
		const body = (await request.json()) as UserUpdate;

		const session = await getSession();

		const data = await updateUser(session.user.sub, body);

		// Force update the user session
		await updateSession(session);

		// Clear cache (for next request)
		revalidateTag('profile');

		return NextResponse.json({ data });
	} catch (error: unknown) {
		return handleApiError(error);
	}
}
