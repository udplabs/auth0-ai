'use server';

import { unstable_cache } from 'next/cache';
import ManagementClient from './management-client';

async function fetchUser(id: string) {
	const auth0Management = new ManagementClient();

	const { data: user } = await auth0Management.users.get({ id });

	return user as UserProfile;
}

export async function getUser({
	userId,
	key = `${userId}:user`,
	tags = [key, `${key}:user:profile`, 'user:profile', 'user'],
}: ActionOptions) {
	tags = [...new Set(tags)];
	const getCachedUser = unstable_cache(() => fetchUser(userId), tags, {
		revalidate: 150,
		tags,
	});

	return getCachedUser();
}
