'use server';
import { sql } from '@/lib/db/drizzle/sql/db';
import {
	settings as dSettings,
	type SettingsModel,
} from '@/lib/db/drizzle/sql/schema';
import { getDateTime } from '@/lib/utils';
import { eq } from 'drizzle-orm';

import type { UICreateSettingsInput, UISettings } from '@/types/settings';

export async function upsertSettings(
	data: UICreateSettingsInput
): Promise<UISettings>;
export async function upsertSettings(
	userId?: string
): Promise<UISettings | void>;
export async function upsertSettings(
	data?: UICreateSettingsInput | string
): Promise<UISettings | void> {
	if (!data) {
		// We can't do anything with nothing
		return;
	}

	if (typeof data === 'string') {
		return await getSettings(data);
	}

	const { id, createdAt, updatedAt, ...rest } = data;

	const payload = {
		createdAt: getDateTime(createdAt, 'date'),
		updatedAt: getDateTime(updatedAt, 'date'),
		...rest,
	};
	const [localSettings] = await sql
		.insert(dSettings)
		.values({ id, ...payload })
		.onConflictDoUpdate({
			target: dSettings.id,
			set: payload,
		})
		.returning();

	return UISettings(localSettings);
}

// Call upsertSettings
export async function getSettings(id: string): Promise<UISettings> {
	const settings = await sql.query.settings.findFirst({
		where: eq(dSettings.id, id),
	});

	if (settings?.createdAt && settings?.updatedAt) {
		return UISettings(settings);
	}
	// NO settings found, otherwise we would have returned already
	// Create placeholder
	return await upsertSettings({
		id,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	});
}

function UISettings(settings: SettingsModel): UISettings {
	return {
		...settings,
		createdAt: getDateTime(settings?.createdAt),
		updatedAt: getDateTime(settings?.updatedAt),
		currentModule: settings?.currentModule ?? undefined,
		labMeta: settings?.labMeta ?? undefined,
		preferences: settings?.preferences ?? undefined,
	} as UISettings;
}
