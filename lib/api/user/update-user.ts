import type { UserProfile } from '@/hooks/use-user-profile';
import { auth0Management } from '@/lib/auth0/management-client';
import { APIError } from '@/lib/errors';
import type { UserUpdate } from 'auth0';

// This call is 'pure' / raw
// Cache invalidation only occurs in API
export const updateUser = async (
	id: string,
	data: UserUpdate
): Promise<UserProfile | undefined> => {
	try {
		if (!auth0Management) {
			console.warn('Auth0 Management API client is not initialized.');
			return;
		}

		const { data: user } = await auth0Management.users.update({ id }, data);

		return user;
	} catch (error: unknown) {
		throw new APIError(
			'server_error:api',
			error instanceof Error ? error?.message : `Update user failed for ${id}`
		);
	}
};
