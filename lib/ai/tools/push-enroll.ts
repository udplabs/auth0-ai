import { tool } from 'ai';
import { z } from 'zod';

export const pushEnrollment = tool({
	description:
		'Generates an Auth0 enrollment ticket URL to initiate enrollment in push notifications for MFA.',
	name: 'pushEnrollment',
	inputSchema: z.object({}),
	execute: async () => {
		console.log('pushEnrollment tool called!');

		const { getUser } = await import('@/lib/auth0');

		const user = await getUser();

		const { createMFAEnrollment } = await import('@/lib/api/user');

		const data = await createMFAEnrollment(user.sub);

		return {
			status: 'success',
			message: 'Enrollment ticket created successfully.',
			data,
			dataCount: 1,
			hasOwnUI: true, // Indicates that the tool has its own UI component
		};
	},
});
