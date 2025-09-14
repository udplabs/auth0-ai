import { APIError, type Errors } from '@/lib/errors';

export const fetcher = async (url: string) => {
	if (url.startsWith('config:')) return null;

	const response = await fetch(url);
	if (!response.ok) {
		const { code, cause } = await response.json();
		throw new APIError(code as Errors.Code, cause);
	}
	return response.json();
};

export async function fetchWithErrorHandlers(
	input: RequestInfo | URL,
	init?: RequestInit
) {
	try {
		const response = await fetch(input, init);

		if (!response.ok) {
			const { code, cause } = await response.json();
			throw new APIError(code as Errors.Code, cause);
		}

		return response;
	} catch (error: unknown) {
		if (typeof navigator !== 'undefined' && !navigator.onLine) {
			throw new APIError('offline:chat');
		}
		throw new APIError(error);
	}
}
