import { getUser } from '@/lib/auth0/client';
import { upsertSettings } from '@/lib/db/queries/settings';
import { APIError, handleApiError } from '@/lib/errors';
import type { UICreateSettingsInput } from '@/types/settings';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// Helper to mark content as synced (no-op since we're using local DB only)
// Sets a cookie so we know whether we have already synced.
export async function POST() {
	try {
		// Set a sync cookie
		const cookieStore = await cookies();

		console.info('content sync skipped - using local database only');

		// No sync needed for local DB - just set the cookie
		cookieStore.set('db:synced', 'true', {
			path: '/',
			expires: new Date(Date.now() + 1000 * 60 * 30),
		});

		return new Response(null, { status: 201 });
	} catch (error: unknown) {
		return handleApiError(error);
	}
}

// Exposes upsertSettings to client can update settings.
export async function PATCH(request: NextRequest) {
	try {
		const user = await getUser();

		const { id = user?.sub, ...settings } =
			(await request.json()) as UICreateSettingsInput;

		if (id && user.sub !== id) {
			throw new APIError('unauthorized:api', 'Invalid user ID');
		}

		await upsertSettings({ id, ...settings });

		revalidateTag('profile');

		return new Response(null, { status: 204 });
	} catch (error: unknown) {
		return handleApiError(error);
	}
}
