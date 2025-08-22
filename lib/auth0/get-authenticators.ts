'use server';

import { unstable_cache } from 'next/cache';
import ManagementClient from './management-client';

async function fetchAuthenticators(id: string) {
	const auth0Management = new ManagementClient();

	return await auth0Management.getFactors(id);
}

export async function getAuthenticators({
	userId,
	key = `${userId}:user`,
	tags = [`${key}:authenticators`, key, 'user:authenticators', 'user'],
}: ActionOptions) {
	tags = [...new Set(tags)];
	const getCachedAuthenticators = unstable_cache(
		() => fetchAuthenticators(userId),
		tags,
		{
			revalidate: 150,
			tags,
		}
	);

	return getCachedAuthenticators();
}
