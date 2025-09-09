import { tool } from 'ai';
import { z } from 'zod';

export const getUserProfile = tool<object, Chat.Tools.Response<UserProfile>>({
	description: 'Get information about the current logged in user.',
	inputSchema: z.object({}),
	name: 'getUserProfile',
	execute: async () => {
		try {
			const { getUser } = await import('@/lib/auth0');

			const user = await getUser();

			// Wait to import until needed
			const { getUserProfile } = await import('@/lib/api/user');

			const data = await getUserProfile({ userId: user.sub });

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
