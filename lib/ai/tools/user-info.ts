import { tool } from 'ai';
import { z } from 'zod';

export const userInfo = tool<object, Chat.Tools.Response<UserProfile>>({
	description: 'Get information about the current logged in user.',
	inputSchema: z.object({}),
	execute: async () => {
		try {
			const { getUser: getSessionUser } = await import('@/lib/auth0/client');
			const { getUser } = await import('@/lib/auth0/get-user');

			const user = await getSessionUser();

			const data = await getUser({ userId: user.sub });

			return {
				status: 'success',
				message: 'User info fetched successfully',
				dataCount: 1,
				// Type assertion to ensure the response matches the User type
				data,
				hasOwnUI: true,
			};
		} catch (error: unknown) {
			console.log(error);
			return {
				status: 'error',
				message: 'Failed to fetch user info',
				dataCount: 0,
			};
		}
	},
});
