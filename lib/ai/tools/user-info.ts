import { tool } from 'ai';
import { z } from 'zod';

import { auth0 } from '@/lib/auth0';

import type { User } from '@auth0/nextjs-auth0/types';

export const userInfo = tool({
  description: 'Get information about the current logged in user.',
  inputSchema: z.object({}),
  execute: async () => {
    try {
      const session = await auth0.getSession();
      if (!session) {
        return 'There is no user logged in.';
      }

      const response = await fetch(
        `https://${process.env.AUTH0_DOMAIN}/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${session.tokenSet.accessToken}`,
          },
        },
      );

      if (response.ok) {
        return (await response.json()) as User;
      }

      throw new Error('Failed to fetch user info');
    } catch (error: unknown) {
      console.log(error);
      return {
        error: 'Unable to fetch user info',
      };
    }
  },
});
