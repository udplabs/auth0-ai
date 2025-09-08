import ManagementClient from '@/lib/auth0/management-client';
import { unstable_cache } from 'next/cache';

async function fetchUserProfile(id: string): Promise<UserProfile> {
	const auth0Management = new ManagementClient();

	const { data: user } = await auth0Management.users.get({ id });

	const { upsertSettings } = await import('@/lib/db/queries/settings');

	const custom_metadata = await upsertSettings({ id: user.user_id }, false);

	return { ...user, custom_metadata };
}

export async function getUserProfile({ userId, key, tags }: ActionOptions) {
	if (!key) {
		const { getCacheKey } = await import('@/lib/utils');

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
