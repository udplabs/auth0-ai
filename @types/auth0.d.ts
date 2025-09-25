import 'auth0';

declare module 'auth0' {
	interface GetUsers200ResponseOneOfInnerAppMetadata {
		has_accounts?: boolean;
	}

	interface EnrollmentCreate {
		factor?:
			| 'push-notification'
			| 'otp'
			| 'phone'
			| 'email'
			| 'webauthn-roaming'
			| 'webauthn-platform';
		allow_multiple_enrollments?: boolean;
	}
}
