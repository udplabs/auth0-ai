import { ManagementClient } from '@/lib/auth0';
import { unstable_cache } from 'next/cache';

import type { GetUsers200ResponseOneOfInner } from 'auth0';

async function fetchUser(id: string) {
  const auth0Management = new ManagementClient();

  const { data: user } = await auth0Management.users.get({ id });

  return user as User;
}

export function getUser({
  userId,
  key = `user:${userId}`,
  tags = [key],
}: GetUserOptions) {
  tags = [...new Set(tags)];
  const getCachedUser = unstable_cache(() => fetchUser(userId), tags, {
    revalidate: 150,
    tags,
  });

  return getCachedUser();
}

export type User = GetUsers200ResponseOneOfInner;

interface GetUserOptions {
  userId: string;
  key?: string;
  tags?: string[];
}
