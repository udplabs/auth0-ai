import type {
	GetUsers200ResponseOneOfInner,
	GetUsers200ResponseOneOfInnerAppMetadata,
} from 'auth0';

declare module '@auth0/nextjs-auth0' {
	interface GetUsers200ResponseOneOfInnerAppMetadata {
		has_accounts?: boolean;
	}
}

declare global {
	interface Factor {
		id?: string;
		enrolled?: boolean;
		type: FactorType;
		displayName?: string;
		createdAt?: string;
		enrolledAt?: string;
		lastAuthAt?: string;
	}

	type FactorType =
		| 'totp'
		| 'recovery-code'
		| 'sms'
		| 'push'
		| 'email'
		| 'push'
		| 'phone'
		| 'webauthn-roaming'
		| 'webauthn-platform'
		| 'passkey'
		| 'password';

	interface UserProfile extends GetUsers200ResponseOneOfInner {
		displayName?: string;
		custom_metadata?: Partial<Omit<Settings, 'createdAt' | 'updatedAt' | 'id'>>;
	}
}

export {};
