import { resetAccountPermissions } from '@/lib/api/accounts/reset-account-permissions';

import { getUser } from '@/lib/auth0';

// Handles resetting account permissions
export async function DELETE() {
	try {
		const user = await getUser();

		console.log('=== RESETTING ACCOUNT PERMISSIONS ===');

		await resetAccountPermissions(user.sub);
		return new Response(null, { status: 204 });
	} catch (error: unknown) {
		const { handleApiError } = await import('@/lib/errors');

		return handleApiError(error);
	}
}
