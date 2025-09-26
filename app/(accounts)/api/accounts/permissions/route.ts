import { resetAccountPermissions } from '@/lib/api/accounts/reset-account-permissions';
import { revalidateTag } from 'next/cache';

import { getUser } from '@/lib/auth0/client';
import { getSettings, upsertSettings } from '@/lib/db/queries/settings';

// Handles resetting account permissions
export async function DELETE() {
	try {
		const user = await getUser();

		console.info('=== RESETTING ACCOUNT PERMISSIONS ===');

		await resetAccountPermissions(user.sub);

		const settings = await getSettings(user.sub);

		if (settings?.currentModule === 5) {
			// User has finished step 5.
			// Force update step
			await upsertSettings({
				...settings,
				currentModule: 6,
			});
		}

		revalidateTag('accounts');
		return new Response(null, { status: 204 });
	} catch (error: unknown) {
		const { handleApiError } = await import('@/lib/errors');

		return handleApiError(error);
	}
}
