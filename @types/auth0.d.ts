import type {
	GetUsers200ResponseOneOfInner,
	GetUsers200ResponseOneOfInnerAppMetadata,
} from 'auth0';

declare module '@auth0/nextjs-auth0' {
	interface GetUsers200ResponseOneOfInnerAppMetadata {
		has_accounts?: boolean;
	}
}
