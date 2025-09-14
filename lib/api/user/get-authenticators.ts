import { auth0Management } from '@/lib/auth0/management-client';
import { APIError } from '@/lib/errors';
import { getCacheKey } from '@/lib/utils';
import { unstable_cache } from 'next/cache';

async function fetchAuthenticators(id: string) {
	try {
		if (!auth0Management) {
			console.warn('Auth0 Management API client is not initialized.');
			return;
		}
		return await auth0Management.getFactors(id);
	} catch (error: unknown) {
		throw new APIError(
			'server_error:api',
			error instanceof Error
				? error?.message
				: `Fetch authenticators failed for ${id}`
		);
	}
}

export async function getAuthenticators({ userId, key, tags }: ActionOptions) {
	if (!key) {
		key = getCacheKey({ userId, resource: ['authenticators'] });
	}

	if (!tags || tags.length === 0) {
		tags = [key, 'authenticators', 'user'];
	}

	tags = [...new Set(tags)];

	const cached = unstable_cache(() => fetchAuthenticators(userId), tags, {
		revalidate: 150,
		tags,
	});

	return cached();
}
