import { getUser } from '@/lib/auth0/client';
import { createMFAEnrollment } from '@/lib/auth0/create-mfa-enrollment';
import { tool } from 'ai';
import { z } from 'zod';

export const pushEnrollment = tool({
	description:
		'Generates an Auth0 enrollment ticket URL to initiate enrollment in push notifications for MFA.',
	name: 'pushEnrollment',
	inputSchema: z.object({}),
	execute: async () => {
		console.log('pushEnrollment tool called!');

		const user = await getUser();

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
