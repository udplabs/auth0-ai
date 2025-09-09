'use server';

import { Prisma as Neon } from '../generated/neon';
import { Prisma } from '../generated/prisma';
import { neon } from '../neon/client';
import { prisma } from '../prisma/client';

export async function upsertSettings(
	data: UICreateSettingsInput,
	revalidate = true
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
	const _data = Object.entries({
		currentLabStep: 'UNKNOWN',
		...rest,
		createdAt:
			typeof createdAt === 'string'
				? new Date(createdAt)
				: (createdAt ?? undefined),
		updatedAt:
			typeof updatedAt === 'string'
				? new Date(updatedAt)
				: ((rest as any).updatedAt ?? undefined),
	});

	// Build update payload:
	// - keep nulls (explicit clears)
	// - drop undefined (not provided)
	const update = Object.fromEntries(_data.filter(([, v]) => v !== undefined));

	// Build create payload:
	// undefined => null
	const createData = {
		id,
		...Object.fromEntries(
			_data.map(([k, v]) => (v === undefined ? [k, null] : [k, v]))
		),
	};

	const result = await prisma.settings.upsert({
		where: { id },
		update,
		create: createData as Prisma.SettingsCreateInput,
	});

	const appInstance = await saveAppInstance();

	// Update remote DB
	// TODO: make this a throw-away call 🤔
	await neon.remoteSettings.upsert({
		where: { id },
		update: {
			...update,
			appInstanceId: appInstance.id,
		},
		create: {
			...createData,
		} as Neon.RemoteSettingsCreateInput,
	});

	if (revalidate) {
		const { revalidateTag } = await import('next/cache');
		// Settings is returned in the user profile
		// We need to inform the cache there has been a change.
		// THIS IS A HACK.
		// TODO: Implement a useSWR mutation? Something better? 🤔
		revalidateTag('profile');
	}

	return {
		...result,
		createdAt: result.createdAt.toISOString(),
		updatedAt: result.updatedAt.toISOString(),
	} as UISettings;
}

// Call upsertSettings
async function getSettings(id?: string): Promise<UISettings | undefined>;
async function getSettings(id?: string, upsert?: true): Promise<UISettings>;
async function getSettings(
	id?: string,
	upsert?: boolean
): Promise<UISettings | undefined> {
	if (!id) return;

	const { createdAt, updatedAt, ...settings } =
		(await prisma.settings.findUnique({ where: { id } })) || {};

	if (createdAt && updatedAt) {
		return {
			...settings,
			createdAt: createdAt.toISOString(),
			updatedAt: updatedAt.toISOString(),
		} as UISettings;
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

	const path = await import('path');
	const filepath = path.join(process.cwd(), filename);

	const exists = await fileExistsAtRoot(filepath);

	const { promises } = await import('fs');
	const { readFile, writeFile } = promises;

	const localAppInstance = exists
		? (await readFile(filepath, 'utf8')).trim()
		: undefined;

	console.log('localAppInstance:', localAppInstance);

	const auth0ClientId = process.env.AUTH0_CLIENT_ID || null;
	const auth0Domain = process.env.AUTH0_DOMAIN || null;

	const { ulid } = await import('ulid');

	const [id = ulid(), hash] = localAppInstance
		? localAppInstance?.split('|')
		: [];

	const str = [];

	if (auth0Domain !== null && auth0ClientId !== null)
		str.push(...[auth0Domain, auth0ClientId]);

	const { createHash } = await import('crypto');

	const hashedInstanceId = createHash('sha1')
		.update(str.join('|'), 'utf8')
		.digest('base64url');

	const appInstanceId = `${id}|${hashedInstanceId}`;

	if (localAppInstance !== appInstanceId) {
		console.log('replacing existing localAppInstance...');
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
		const { promises } = await import('fs');
		const { access } = promises;

		await access(filepath);
		return true;
	} catch {
		return false;
	}
}
