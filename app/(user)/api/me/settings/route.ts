import { getUser } from '@/lib/auth0';
import { NextRequest } from 'next/server';

// Helper to sync user content with the database
// Sets a cookie so we know whether we have already synced.
export async function POST() {
	try {
		const { cookies } = await import('next/headers');
		// Set a sync cookie
		const cookieStore = await cookies();

		console.log('syncing remote content...');

		const { syncContent } = await import('@/lib/db/queries/content');

		await syncContent();

		cookieStore.set('db:synced', 'true', {
			path: '/',
			expires: new Date(Date.now() + 1000 * 60 * 30),
		});

		return new Response(null, { status: 201 });
	} catch (error: unknown) {
		const { handleApiError } = await import('@/lib/errors');
		return handleApiError(error);
	}
}

// Exposes upsertSettings to client can update settings.
export async function PATCH(request: NextRequest) {
	try {
		const user = await getUser();

		const { id, ...settings } = (await request.json()) as UICreateSettingsInput;

		if (user.sub !== id) {
			const { APIError } = await import('@/lib/errors');
			throw new APIError('unauthorized:api', 'Invalid user ID');
		}

		const { upsertSettings } = await import('@/lib/db/queries/settings');

		await upsertSettings({ id, ...settings });

		return new Response(null, { status: 204 });
	} catch (error: unknown) {
		const { handleApiError } = await import('@/lib/errors');
		return handleApiError(error);
	}
}
