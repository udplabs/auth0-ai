import { auth0Management } from '@/lib/auth0';
import { upsertSettings } from '@/lib/db/queries/settings';
import { APIError } from '@/lib/errors';
import { getCacheKey } from '@/lib/utils';
import { unstable_cache } from 'next/cache';

async function fetchUserProfile(id: string): Promise<UserProfile> {
	try {
		console.log('fetching profile...');

		const { data: user } = await auth0Management.users.get({ id });

		const custom_metadata = await upsertSettings({ id: user.user_id });

		return { ...user, custom_metadata };
	} catch (error: unknown) {
		throw new APIError(
			'server_error:api',
			error instanceof Error ? error?.message : `Fetch profile failed for ${id}`
		);
	}
}

export async function getUserProfile({ userId, key, tags }: ActionOptions) {
	if (!key) {
		key = getCacheKey({ userId, resource: ['profile'] });
	}

	if (!tags || tags.length === 0) {
		tags = [key, 'profile'];
	}

	tags = [...new Set(tags)];

	const cached = unstable_cache(() => fetchUserProfile(userId), tags, {
		revalidate: 150,
		tags,
	});

	return cached();
}
