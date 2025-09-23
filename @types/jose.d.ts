import 'jose';

declare module 'jose' {
	export interface JWTPayload {
		scope: string;
	}
}
