import { getUserProfile as getUserProfileApi } from '@/lib/api/user/get-user-profile';
import { getUser } from '@/lib/auth0/client';
import { tool } from 'ai';
import { z } from 'zod';

import type { UserProfile } from '@/hooks/use-user-profile';
import type { Chat } from '@/types/chat';

export const getUserProfile = tool<object, Chat.ToolsResponse<UserProfile>>({
	description: 'Get information about the current logged in user.',
	inputSchema: z.object({}),
	name: 'getUserProfile',
	execute: async () => {
		try {
			const user = await getUser();

			const data = await getUserProfileApi({ userId: user.sub });

			return {
				status: 'success',
				message: 'User profile fetched successfully',
				dataCount: 1,
				// Type assertion to ensure the response matches the User type
				data,
				hasOwnUI: true,
			};
		} catch (error: unknown) {
			console.log(error);

			const { APIError } = await import('@/lib/errors');

			return {
				...new APIError(error).toJSON(),
				status: 'error',
				dataCount: 0,
			};
		}
	},
});
