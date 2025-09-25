import { resetAccountPermissions } from '@/lib/api/accounts/reset-account-permissions';
import { revalidateTag } from 'next/cache';

import { getUser } from '@/lib/auth0/client';

// Handles resetting account permissions
export async function DELETE() {
	try {
		const user = await getUser();

		console.info('=== RESETTING ACCOUNT PERMISSIONS ===');

		await resetAccountPermissions(user.sub);

		revalidateTag('accounts');
		return new Response(null, { status: 204 });
	} catch (error: unknown) {
		const { handleApiError } = await import('@/lib/errors');

		return handleApiError(error);
	}
}
