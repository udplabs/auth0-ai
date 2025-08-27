import ManagementClient from '@/lib/auth0/management-client';
import { getCacheKey } from '@/lib/utils';
import { unstable_cache } from 'next/cache';

async function fetchAuthenticators(id: string) {
	const auth0Management = new ManagementClient();

	return await auth0Management.getFactors(id);
}

export async function getAuthenticators({ userId, key, tags }: ActionOptions) {
	if (!key) {
		key = getCacheKey({ userId, resource: ['authenticators'] });
	}

	if (!tags || tags.length === 0) {
		tags = [key, 'authenticators', 'user'];
	}

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
