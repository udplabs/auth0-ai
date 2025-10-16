'use server';
import { isDev } from '@/lib/constants';
import { sql } from '@/lib/db/drizzle/sql/db';
import {
	settings as dSettings,
	type SettingsModel,
} from '@/lib/db/drizzle/sql/schema';
import { db as drizzle } from '@/lib/db/drizzle/supabase/db';
import {
	appInstance as dAppInstance,
	remoteSettings,
} from '@/lib/db/drizzle/supabase/schema';
import { getDateTime, ulid } from '@/lib/utils';
import { createHash } from 'crypto';
import { eq } from 'drizzle-orm';
import { promises } from 'fs';
import path from 'path';

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

	const appInstance = await saveAppInstance();

	// Update remote DB
	// TODO: make this a throw-away call 🤔
	if (!isDev) {
		await drizzle
			.insert(remoteSettings)
			.values({
				...localSettings,
				createdAt: getDateTime(localSettings.createdAt),
				updatedAt: getDateTime(localSettings.updatedAt),
				appInstanceId: appInstance.id,
			})
			.onConflictDoUpdate({
				target: remoteSettings.id,
				set: {
					...localSettings,
					createdAt: getDateTime(localSettings.createdAt),
					updatedAt: getDateTime(localSettings.updatedAt),
				},
			});
	}

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
export async function saveAppInstance() {
	const filename = '.app-instance.local';

	const filepath = path.join(process.cwd(), filename);

	const exists = await fileExistsAtRoot(filepath);

	const { readFile, writeFile } = promises;

	const localAppInstance = exists
		? (await readFile(filepath, 'utf8')).trim()
		: undefined;

	const auth0ClientId = process.env.AUTH0_CLIENT_ID || null;
	const auth0Domain = process.env.AUTH0_DOMAIN || null;

	const [id = ulid()] = localAppInstance ? localAppInstance?.split('|') : [];

	const str = [];

	if (auth0Domain !== null && auth0ClientId !== null)
		str.push(...[auth0Domain, auth0ClientId]);

	const hashedInstanceId = createHash('sha1')
		.update(str.join('|'), 'utf8')
		.digest('base64url');

	const appInstanceId = `${id}|${hashedInstanceId}`;

	if (localAppInstance !== appInstanceId) {
		// replace localAppInstanceId
		try {
			await writeFile(filepath, appInstanceId, 'utf8');
		} catch {
			/* Read-only env. Skip. */
		}
	}

	const [result] = await drizzle
		.insert(dAppInstance)
		.values({ auth0ClientId, auth0Domain, hashedInstanceId, id })
		.onConflictDoUpdate({
			target: dAppInstance.id,
			set: { auth0ClientId, auth0Domain, hashedInstanceId },
		})
		.returning();

	return result;
	// return await supabase.appInstance.upsert({
	// 	where: { id },
	// 	update: {
	// 		auth0ClientId,
	// 		auth0Domain,
	// 		hashedInstanceId,
	// 	},
	// 	create: {
	// 		id,
	// 		auth0ClientId,
	// 		auth0Domain,
	// 		hashedInstanceId,
	// 	},
	// });
}

export async function fileExistsAtRoot(filepath: string) {
	try {
		const { access } = promises;

		await access(filepath);
		return true;
	} catch {
		return false;
	}
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
