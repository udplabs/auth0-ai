import { ManagementClient } from '@/lib/auth0';
import { unstable_cache } from 'next/cache';

async function fetchAuthenticators(id: string) {
  const auth0Management = new ManagementClient();

  return await auth0Management.getFactors(id);
}

export function getAuthenticators({
  userId,
  key = `user:${userId}:authenticators`,
  tags = [key],
}: GetAuthenticatorsOptions) {
  tags = [...new Set(tags)];
  const getCachedAuthenticators = unstable_cache(
    () => fetchAuthenticators(userId),
    tags,
    {
      revalidate: 150,
      tags,
    },
  );

  return getCachedAuthenticators();
}

interface GetAuthenticatorsOptions {
  userId: string;
  key?: string;
  tags?: string[];
}
