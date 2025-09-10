import { auth0Management } from '@/lib/auth0';
import { APIError } from '@/lib/errors';
import type { UserUpdate } from 'auth0';

// This call is 'pure' / raw
// Cache invalidation only occurs in API
export const updateUser = async (
	id: string,
	data: UserUpdate
): Promise<UserProfile> => {
	try {
		const { data: user } = await auth0Management.users.update({ id }, data);

		return user;
	} catch (error: unknown) {
		throw new APIError(
			'server_error:api',
			error instanceof Error ? error?.message : `Update user failed for ${id}`
		);
	}
};
