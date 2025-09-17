'use server';
import { createHash } from 'crypto';
import { promises } from 'fs';
import path from 'path';
import { ulid } from 'ulid';
import { RemoteSettingsCreateInput } from '../generated/neon/models';
import { SettingsCreateInput, SettingsModel } from '../generated/prisma/models';
import { neon } from '../neon/client';
import { prisma } from '../prisma/client';

import type { UICreateSettingsInput, UISettings } from '@/types/settings';
export async function upsertSettings(
	data: UICreateSettingsInput
): Promise<UISettings> {
	const { id, ...rest } = data;

	// Decide intent:
	// - isUpsert = at least one provided field besides `id`
	//   (null counts as a provided value; undefined does not)
	const isUpsert = Object.values(rest).some((v) => v !== undefined);

	// GET flow
	// If GET fails, upsert will be called
	if (!isUpsert) {
		return await getSettings(id, true);
	}

	const { createdAt, updatedAt } = rest || {};

	// Build base data object
	// - coerce ISO strings to Date for createdAt/updatedAt
	const payload = {
		...data,
		createdAt:
			typeof createdAt === 'string'
				? new Date(createdAt)
				: (createdAt ?? undefined),
		updatedAt:
			typeof updatedAt === 'string'
				? new Date(updatedAt)
				: ((rest as any).updatedAt ?? undefined),
	};

	const result = await prisma.settings.upsert({
		where: { id },
		update: payload,
		create: payload as SettingsCreateInput,
	});

	const appInstance = await saveAppInstance();

	// Update remote DB
	// TODO: make this a throw-away call 🤔
	await neon.remoteSettings.upsert({
		where: { id },
		update: {
			...payload,
			appInstanceId: appInstance.id,
		},
		create: {
			...payload,
		} as RemoteSettingsCreateInput,
	});

	return UISettings(result);
}

// Call upsertSettings
async function getSettings(id?: string): Promise<UISettings | undefined>;
async function getSettings(id?: string, upsert?: true): Promise<UISettings>;
async function getSettings(
	id?: string,
	upsert?: boolean
): Promise<UISettings | undefined> {
	if (!id) return;

	const settings = await prisma.settings.findUnique({ where: { id } });

	if (settings?.createdAt && settings?.updatedAt) {
		return UISettings(settings);
	}

	if (upsert) {
		// NO settings found, otherwise we would have returned already
		// Create placeholder
		return await upsertSettings({
			id,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}
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

	return await neon.appInstance.upsert({
		where: { id },
		update: {
			auth0ClientId,
			auth0Domain,
			hashedInstanceId,
		},
		create: {
			id,
			auth0ClientId,
			auth0Domain,
			hashedInstanceId,
		},
	});
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
		currentLabStep: settings?.currentLabStep ?? undefined,
		nextLabStep: settings?.nextLabStep ?? undefined,
		labMeta: settings?.labMeta ?? undefined,
		preferences: settings?.preferences ?? undefined,
		createdAt: settings.createdAt.toISOString(),
		updatedAt: settings.updatedAt.toISOString(),
	} as UISettings;
}
