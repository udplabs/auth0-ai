import { ManagementClient } from '@/lib/auth0';

import type { UserUpdate } from 'auth0';

export const updateUser = async (
	id: string,
	data: UserUpdate
): Promise<UserProfile> => {
	const client = new ManagementClient();

	const { data: user } = await client.users.update({ id }, data);

	return user;
};
