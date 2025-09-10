import type { Settings } from '@/lib/db/generated/prisma';
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

	interface UISettings extends Settings {
		createdAt: string;
		updatedAt: string;
	}

	interface UICreateSettingsInput extends Partial<UISettings> {
		id: string;
		createdAt?: string | Date;
		updatedAt?: string | Date;
	}

	type UIGeolocation = Geo;

	interface Window {
		__dbSyncPromise?: Promise<void>;
	}
}
