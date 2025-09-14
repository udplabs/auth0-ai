'use server';

import {
	Prisma as Neon,
	RemoteContent as RemoteContentModel,
} from '../generated/neon';
import {
	ContentPlacement,
	ContentType,
	LocalContent as LocalContentModel,
	MimeType,
	Prisma,
} from '../generated/prisma';
import { neon } from '../neon/client';
import { prisma } from '../prisma/client';

namespace Content {
	export interface UIContent
		extends Omit<
				RemoteContentModel,
				| 'createdAt'
				| 'updatedAt'
				| 'contentType'
				| 'contentPlacement'
				| 'mimeType'
			>,
			Omit<
				LocalContentModel,
				| 'createdAt'
				| 'updatedAt'
				| 'expiresAt'
				| 'lastSyncedAt'
				| 'contentType'
				| 'mimeType'
				| 'contentPlacement'
			> {
		createdAt?: string;
		updatedAt?: string;
		contentType: UIType;
		contentPlacement?: UIContentPlacement;
		embedding?: number[];
		mimeType?: UIMimeType;
	}

	export type UIContentPlacement = 'aiya' | 'labs' | 'secret';

	/**
	 * GUIDE_: Presented to user as static content OR incorporated into response with adjustments.
	 *
	 * PROMPT_: Ingested as part of _system prompt_.
	 *
	 */
	export type UIType =
		| 'guide/step'
		| 'guide/lab'
		| 'prompt/step'
		| 'prompt/system'
		| 'prompt/lab'
		| 'prompt/unknown'
		| 'reference/code'
		| 'unknown';

	export type UIMimeType =
		| 'text/markdown'
		| 'text/plan'
		| 'text/html'
		| 'text/csv'
		| 'application/json'
		| 'application/xml'
		| 'application/typescript';

	export interface GetParams {
		key?: QueryKeys;
		query?: string;
		contentPlacement?: UIContentPlacement;
		contentType?: UIType;
	}

	type QueryKeys = 'name' | 'filename' | 'labStep';
}

function getContentType(contentType: Content.UIType) {
	const dbContentType = contentType
		.replace('/', '_')
		.toUpperCase() as ContentType;
	return ContentType[dbContentType];
}

function getMimeType(mimeType: string) {
	const dbMimeType = mimeType.replace('/', '_').toUpperCase() as MimeType;
	return MimeType[dbMimeType];
}

function getContentPlacement(contentPlacement: string) {
	const dbContentPlacement = contentPlacement
		.replace('/', '_')
		.toUpperCase() as ContentPlacement;
	return ContentPlacement[dbContentPlacement];
}

function getUIMimeType(mimeType: MimeType | null) {
	if (mimeType !== null) {
		return mimeType.replace('_', '/').toLowerCase() as Content.UIMimeType;
	}
}

function getUIContentType(contentType: ContentType | null) {
	if (contentType !== null) {
		return contentType.replace('_', '/').toLowerCase() as Content.UIType;
	}
	return 'unknown';
}
function getUIContentPlacement(contentPlacement: ContentPlacement | null) {
	if (contentPlacement !== null) {
		return contentPlacement.toLowerCase() as Content.UIContentPlacement;
	}
}

function buildQuery({
	key,
	query,
	contentType,
	contentPlacement,
}: Content.GetParams) {
	const AND: Prisma.LocalContentWhereInput[] | Neon.RemoteContentWhereInput[] =
		[];

	if (key && query) {
		if (key === 'name') {
			AND.push({ name: { contains: query } });
		} else if (key === 'filename') {
			AND.push({ name: { equals: query } });
			AND.push({ mimeType: { equals: getMimeType(query) } });
		} else if (key === 'labStep') {
			AND.push({
				labStep: { equals: query.replace('_', '-').toLowerCase() },
			});
		}
	}

	if (key !== 'filename') {
		if (contentType) {
			AND.push({ contentType: { equals: getContentType(contentType) } });
		}

		if (contentPlacement) {
			AND.push({
				contentPlacement: { equals: getContentPlacement(contentPlacement) },
			});
		}
	}

	if (!AND.length) throw new Error('Must provide valid search parameters!');

	return AND;
}
export async function findFirstContent(
	params: Content.GetParams
): Promise<Content.UIContent | undefined> {
	const AND = buildQuery(params);

	if (!AND.length) throw new Error('Must provide valid search parameters!');

	const localContent = await prisma.localContent.findFirst({
		where: {
			AND: [
				...AND,
				{ expiresAt: { gt: new Date() } },
			] as Prisma.LocalContentWhereInput[],
		},
	});

	if (localContent != null) {
		return UIContent(localContent);
	}

	// Fetch remote content
	const content = await neon.remoteContent.findFirst({
		where: { AND: [...AND] as Neon.RemoteContentWhereInput[] },
	});

	if (content != null) {
		// Update local copy
		return await updateLocalContent(content);
	}
}

export async function findAllContent(
	params: Content.GetParams
): Promise<Content.UIContent[]> {
	const AND = buildQuery(params);

	const localContent = await prisma.localContent.findMany({
		where: {
			AND: [
				...AND,
				{ expiresAt: { gt: new Date() } },
			] as Prisma.LocalContentWhereInput[],
		},
	});

	if (!localContent.length) {
		const content = await neon.remoteContent.findMany({
			where: { AND: [...AND] as Neon.RemoteContentWhereInput[] },
		});

		return updateLocalContent(content);
	}

	return UIContent(localContent);
}

export async function getContentById(id: string) {
	const localContent = await prisma.localContent.findUnique({
		where: { id },
	});

	if (localContent != null) return UIContent(localContent);

	// Check remote
	const remoteContent = await neon.remoteContent.findUnique({
		where: { id },
	});

	if (remoteContent != null) {
		// Update local copy
		return await updateLocalContent(remoteContent);
	}

	// If no local or remote content found, return undefined
	return undefined;
}

// =============== Convenience wrappers ===============
export async function getSystemPrompts(): Promise<Content.UIContent[]> {
	return await findAllContent({
		contentType: 'prompt/system',
	});
}
export async function getStepPrompts(
	query: string
): Promise<Content.UIContent[]> {
	return await findAllContent({
		key: 'labStep',
		query,
		contentType: 'prompt/step',
	});
}

export async function getStepGuides(
	query: string
): Promise<Content.UIContent[]> {
	return await findAllContent({
		key: 'labStep',
		query,
		contentType: 'guide/step',
		contentPlacement: 'labs',
	});
}

export async function getStepCode(step: string) {
	return await findAllContent({
		key: 'labStep',
		query: step,
		contentType: 'reference/code',
	});
}

// Wrapper to make initial app a bit faster
export async function syncContent(): Promise<void> {
	// Sync local content with remote content
	const remoteContent = await neon.remoteContent.findMany();

	await updateLocalContent(remoteContent);
}
// =====================================================

export async function updateLocalContent(
	data: RemoteContentModel
): Promise<Content.UIContent>;
export async function updateLocalContent(
	data: RemoteContentModel[]
): Promise<Content.UIContent[]>;
export async function updateLocalContent(
	data: RemoteContentModel | RemoteContentModel[]
): Promise<Content.UIContent | Content.UIContent[]> {
	const lastSyncedAt = new Date();
	const expiresAt = new Date(lastSyncedAt.getTime() + 1000 * 60 * 24); // 30 minutes

	const isArray = Array.isArray(data);
	const _data = isArray ? data : [data];

	const localContent = await prisma.$transaction([
		..._data.map((c) => {
			return prisma.localContent.upsert({
				where: { id: c.id },
				update: {
					...c,
					applicationData: (c?.applicationData || null) as Prisma.JsonObject,
					lastSyncedAt,
					expiresAt,
				},
				create: {
					...c,
					applicationData: (c?.applicationData || null) as Prisma.JsonObject,
					lastSyncedAt,
					expiresAt,
				} as Prisma.LocalContentCreateInput,
			});
		}),
	]);

	if (isArray) {
		return UIContent(localContent);
	}

	return UIContent(localContent[0]);
}

function UIContent(content: LocalContentModel): Content.UIContent;
function UIContent(content: LocalContentModel[]): Content.UIContent[];
function UIContent(
	content: LocalContentModel | LocalContentModel[]
): Content.UIContent | Content.UIContent[] {
	const isArray = Array.isArray(content);
	const _content = isArray ? content : [content];
	const omitAlways = new Set<keyof any>(['expiresAt', 'lastSyncedAt']);
	const cleaned = _content.map<Content.UIContent>((c) => {
		const ui: Content.UIContent = {
			...c,
			contentPlacement: getUIContentPlacement(c?.contentPlacement),
			contentType: getUIContentType(c.contentType),
			mimeType: getUIMimeType(c.mimeType),
			createdAt: c.createdAt.toISOString(),
			updatedAt: c.updatedAt.toISOString(),
		};

		for (const key of Object.keys(ui) as (keyof typeof ui)[]) {
			if (ui[key] == null || omitAlways.has(key)) {
				delete ui[key];
			}
		}
		return ui;
	});

	return isArray ? cleaned : cleaned[0];
}
