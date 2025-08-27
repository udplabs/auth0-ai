import { createHash } from 'crypto';
import { access, readFile, writeFile } from 'fs/promises';
import { revalidateTag } from 'next/cache';
import { after } from 'next/server';
import path from 'path';
import { ulid } from 'ulid';
import { neon } from '../neon/client';
import { prisma } from '../prisma/client';

export async function saveSettings(
	data: UICreateSettingsInput
): Promise<UISettings | undefined> {
	const {
		id,
		createdAt: _,
		updatedAt: __,
		currentLabStep = 'unknown',
		...updateData
	} = data;

	if (!id) {
		console.log('user has not yet authenticated!');
		return;
	}

	const result = await prisma.settings.upsert({
		where: { id },
		update: { currentLabStep, ...updateData },
		create: { id, currentLabStep, ...updateData },
	});

	const appInstance = await saveAppInstance();

	await neon.remoteSettings.create({
		data: {
			...result,
			appInstance: {
				connect: { id: appInstance.id },
			},
		},
	});

	// Settings is returned in the user profile
	// We need to inform the cache there has been a change.
	// This is a hack.
	revalidateTag('profile');

	return {
		...result,
		createdAt: result.createdAt.toISOString(),
		updatedAt: result.updatedAt.toISOString(),
	} as UISettings;
}

export async function getSettings(
	id?: string
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

	// NO settings found
	// Create placeholder
	return await saveSettings({ id, currentLabStep: 'unknown', ...settings });
}

export async function getContentByName(
	name?: string | null
): Promise<UIContent | undefined> {
	if (!name) return;

	const content = await neon.content.findFirst({
		where: {
			name: {
				equals: name,
			},
		},
	});

	if (content !== null) {
		return {
			...content,
			createdAt: content?.createdAt.toISOString(),
			updatedAt: content?.updatedAt.toISOString(),
		};
	}
}

export async function getContentByType(type: string): Promise<UIContent[]> {
	const content =
		(await neon.content.findMany({
			where: {
				type: {
					equals: type,
				},
			},
		})) || [];

	return content.map((c) => ({
		...c,
		createdAt: c?.createdAt.toISOString(),
		updatedAt: c?.updatedAt.toISOString(),
	}));
}

export async function saveAppInstance() {
	const filename = '.app-instance.local';
	const filepath = path.join(process.cwd(), filename);

	const exists = await fileExistsAtRoot(filepath);

	const localAppInstance = exists
		? (await readFile(filepath, 'utf8')).trim()
		: undefined;

	console.log('localAppInstance:', localAppInstance);

	const auth0ClientId = process.env.AUTH0_CLIENT_ID || null;
	const auth0Domain = process.env.AUTH0_DOMAIN || null;

	const [id = ulid(), hash] = localAppInstance
		? localAppInstance?.split('|')
		: [];

	const str = [];

	if (auth0Domain !== null && auth0ClientId !== null)
		str.push(...[auth0Domain, auth0ClientId]);

	const hashedInstanceId = createHash('sha1')
		.update(str.join('|'), 'utf8')
		.digest('base64url');

	const appInstanceId = `${id}|${hashedInstanceId}`;

	if (localAppInstance && localAppInstance !== appInstanceId) {
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

async function fileExistsAtRoot(filepath: string) {
	try {
		await access(filepath);
		return true;
	} catch {
		return false;
	}
}
