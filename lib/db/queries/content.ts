'use server';

import {
	ContentPlacement,
	ContentType,
	MimeType,
} from '../generated/prisma/enums';
import { JsonObject } from '../generated/prisma/internal/prismaNamespace';
import {
	LocalContentCreateInput,
	LocalContentModel,
	LocalContentWhereInput,
} from '../generated/prisma/models';
import {
	RemoteContentModel,
	RemoteContentWhereInput,
} from '../generated/supabase/models';
import { prisma } from '../prisma/client';
import { supabase } from '../supabase/client';

namespace Content {
	export interface UIContent
		extends Pick<RemoteContentModel, 'id' | 'name'>,
			Pick<LocalContentModel, 'id' | 'name'> {
		createdAt?: string;
		updatedAt?: string;
		contentType: UIType;
		contentPlacement?: UIContentPlacement;
		embedding?: number[];
		mimeType?: UIMimeType;
		textData?: string;
		labModule?: number;
		applicationData?: Record<string, any>;
	}

	export type UIContentPlacement = 'aiya' | 'labs' | 'secret';

	/**
	 * GUIDE_: Presented to user as static content OR incorporated into response with adjustments.
	 *
	 * PROMPT_: Ingested as part of _system prompt_.
	 *
	 */
	export type UIType =
		| 'guide/module'
		| 'guide/lab'
		| 'prompt/module'
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

	type QueryKeys = 'name' | 'filename' | 'labModule';
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
	const AND: LocalContentWhereInput[] | RemoteContentWhereInput[] = [];

	if (key && query) {
		if (key === 'name') {
			AND.push({ name: { contains: query } });
		} else if (key === 'filename') {
			AND.push({ name: { equals: query } });
			AND.push({ mimeType: { equals: getMimeType(query) } });
		} else if (key === 'labModule') {
			AND.push({
				labModule: { equals: parseInt(query.replace('_', '-')) },
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
			] as LocalContentWhereInput[],
		},
	});

	if (localContent != null) {
		return UIContent(localContent);
	}

	// Fetch remote content
	const content = await supabase.remoteContent.findFirst({
		where: { AND: [...AND] as RemoteContentWhereInput[] },
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
			] as LocalContentWhereInput[],
		},
	});

	if (!localContent.length) {
		const content = await supabase.remoteContent.findMany({
			where: { AND: [...AND] as RemoteContentWhereInput[] },
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
	const remoteContent = await supabase.remoteContent.findUnique({
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
		key: 'labModule',
		query,
		contentType: 'prompt/module',
	});
}

export async function getAllStepPrompts() {
	return await findAllContent({
		contentType: 'prompt/module',
	});
}

interface GetStepGuidesParams {
	query: string;
	contentType?: Content.UIType;
	contentPlacement?: Content.UIContentPlacement;
}

export async function getStepGuides({
	query,
	contentType = 'guide/module',
	contentPlacement,
}: GetStepGuidesParams): Promise<Content.UIContent[]> {
	return await findAllContent({
		key: 'labModule',
		query,
		contentType,
		contentPlacement,
	});
}

export async function getModuleCode(module: string) {
	return await findAllContent({
		key: 'labModule',
		query: module,
		contentType: 'reference/code',
	});
}

// Wrapper to make initial app a bit faster
export async function syncContent(): Promise<void> {
	// Sync local content with remote content
	const remoteContent = await supabase.remoteContent.findMany();

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
					applicationData: (c?.applicationData || null) as JsonObject,
					lastSyncedAt,
					expiresAt,
				},
				create: {
					...c,
					applicationData: (c?.applicationData || null) as JsonObject,
					lastSyncedAt,
					expiresAt,
				} as LocalContentCreateInput,
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
			applicationData: c.applicationData as Record<string, any>,
			labModule: c?.labModule != null ? c.labModule : undefined,
			textData:
				c?.textData != null
					? c.textData?.replaceAll('./assets', '/assets')
					: undefined,
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
