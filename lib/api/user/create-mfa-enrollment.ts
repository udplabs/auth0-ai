import { ManagementClient } from '@/lib/auth0';

type AuthenticatorType = 'totp' | 'sms' | 'push' | 'email';

export const createMFAEnrollment = async (
	user_id: string,
	authenticator: AuthenticatorType = 'push'
) => {
	const management = new ManagementClient();

	const {
		data: { ticket_url },
	} = await management.guardian.createEnrollmentTicket({
		user_id,
		// SDK passes through body as-is and types are not correct. Endpoint will accept.
		// @ts-ignore
		factor: getAuthenticatorType(authenticator),
		allow_multiple_enrollments: true,
		send_mail: false,
	});

	return ticket_url;
};

export function getAuthenticatorType(type: AuthenticatorType) {
	switch (type) {
		case 'totp':
			return 'otp';
		case 'sms':
			return 'phone';
		case 'push':
			return 'push-notification';
		case 'email':
			return 'email';
		default:
			throw new Error(`Unknown authenticator type: ${type}`);
	}
}
