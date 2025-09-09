import type { UserUpdate } from 'auth0';
import { type NextRequest, NextResponse } from 'next/server';

// Get user profile
export async function GET() {
	try {
		const { getUser } = await import('@/lib/auth0');

		const user = await getUser();
		const userId = user.sub;

		const { getUserProfile } = await import('@/lib/api/user');

		const data = await getUserProfile({ userId });

		return NextResponse.json(data);
	} catch (error) {
		const { handleApiError } = await import('@/lib/errors');
		return handleApiError(error);
	}
}

export async function PATCH(request: NextRequest) {
	try {
		const { getSession, updateSession } = await import('@/lib/auth0');

		const body = (await request.json()) as UserUpdate;

		const session = await getSession(true);

		const { updateUser } = await import('@/lib/api/user');

		const data = await updateUser(session.user.sub, body);

		// Force update the user session
		await updateSession(session);

		const { revalidateTag } = await import('next/cache');

		// Clear cache (for next request)
		revalidateTag('profile');

		return NextResponse.json({ data });
	} catch (error: unknown) {
		const { handleApiError } = await import('@/lib/errors');
		return handleApiError(error);
	}
}
