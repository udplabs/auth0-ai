import ManagementClient from '@/lib/auth0/management-client';
import { getSettings } from '@/lib/db/queries/settings';
import { getCacheKey } from '@/lib/utils';
import { unstable_cache } from 'next/cache';

async function fetchUserProfile(id: string): Promise<UserProfile> {
	const auth0Management = new ManagementClient();

	const { data: user } = await auth0Management.users.get({ id });

	const custom_metadata = await getSettings(user.user_id);

	return { ...user, custom_metadata };
}

export async function getUserProfile({ userId, key, tags }: ActionOptions) {
	if (!key) {
		key = getCacheKey({ userId, resource: ['profile'] });
	}

	if (!tags || tags.length === 0) {
		tags = [key, 'profile'];
	}

	tags = [...new Set(tags)];

	const getCachedUserProfile = unstable_cache(
		() => fetchUserProfile(userId),
		tags,
		{
			revalidate: 150,
			tags,
		}
	);

	return getCachedUserProfile();
}
