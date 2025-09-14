import type { Geo } from '@vercel/functions';
declare global {
	interface PaginatedOptions {
		page?: number;
		pageSize?: number;
	}
	interface PaginatedResults {
		page: number;
		pageSize: number;
		total: number;
		totalPages: number;
	}

	type UIGeolocation = Geo;

	interface Window {
		__dbSyncPromise?: Promise<void>;
	}
}
