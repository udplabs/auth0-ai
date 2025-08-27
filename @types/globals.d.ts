import type { Content } from '@/lib/db/generated/neon';
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

	type UICreateSettingsInput = Partial<UISettings>;

	type UIGeolocation = Geo;

	interface UIContent extends Omit<Content, 'createdAt' | 'updatedAt'> {
		createdAt?: string;
		updatedAt?: string;
	}
}
