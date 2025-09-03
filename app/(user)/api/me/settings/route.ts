import { syncContent } from '@/lib/db/queries/content';
import { cookies } from 'next/headers';

import { APIError } from '@/lib/errors';

export async function POST() {
	try {
		// Set a sync cookie
		const cookieStore = await cookies();
		// const isSynced = cookieStore.has('db:synced');

		console.log('syncing remote content...');

		await syncContent();

		cookieStore.set('db:synced', 'true', {
			path: '/',
			expires: new Date(Date.now() + 1000 * 60 * 30),
		});
		// if (!isSynced) {
		// }

		return new Response(null, { status: 201 });
	} catch (error: unknown) {
		console.log('API error: ', error);
		if (error instanceof APIError) {
			return error.toResponse();
		}

		return new APIError('server_error:api', error).toResponse();
	}
}
