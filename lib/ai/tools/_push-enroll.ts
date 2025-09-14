import { createMFAEnrollment } from '@/lib/api/user';
import { getUser } from '@/lib/auth0';
import { tool } from 'ai';
import { z } from 'zod';
export const pushEnrollment = tool({
	description:
		'Generates an Auth0 enrollment ticket URL to initiate enrollment in push notifications for MFA.',
	name: 'pushEnrollment',
	inputSchema: z.object({}),
	execute: async () => {
		console.log('pushEnrollment tool called!');
		try {
			const user = await getUser();

			const data = await createMFAEnrollment(user.sub);

			return {
				status: 'success',
				message: 'Enrollment ticket created successfully.',
				data,
				dataCount: 1,
				hasOwnUI: true, // Indicates that the tool has its own UI component
			};
		} catch (error: unknown) {
			// Normalize to your APIError -> JSON shape, but keep the ToolResponse contract
			const { APIError } = await import('@/lib/errors');

			// DO NOT THROW. Always return a valid ToolResponse.
			// Throwing will cause the entire LLM request to fail.
			// Instead, return a safe error response with no data.
			// The model can decide how to proceed from there.
			return {
				message: 'Failed to create enrollment ticket.',
				...new APIError(error).toJSON(),
				status: 'error',
				dataCount: 0,
			};
		}
	},
});
