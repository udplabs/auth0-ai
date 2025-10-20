'use server';

import { ASSET_URL } from '@/lib/constants';
import { sql } from '@/lib/db/drizzle/sql/db';
import { localContent as dLocalContent } from '@/lib/db/drizzle/sql/schema';
import { db as drizzle } from '@/lib/db/drizzle/supabase/db';
import {
	ContentType as dContentType,
	remoteContent,
	type ContentPlacement as dContentPlacement,
	type MimeType as dMimeType,
} from '@/lib/db/drizzle/supabase/schema';
import { getDateTime } from '@/lib/utils';
import { and, eq, gt, type SQL } from 'drizzle-orm';
namespace Content {
	export type LocalContentModel = typeof dLocalContent.$inferSelect;
	export type RemoteContentModel = typeof remoteContent.$inferSelect;
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
		| 'text/typescript'
		| 'application/json'
		| 'application/xml';

	export interface GetParams {
		key?: QueryKeys;
		query?: string;
		contentPlacement?: UIContentPlacement;
		contentType?: UIType;
		mimeType?: UIMimeType;
	}

	type QueryKeys = 'name' | 'filename' | 'labModule';
}

function buildDrizzleQuery({
	key,
	query,
	contentType,
	contentPlacement,
	mimeType,
}: Content.GetParams) {
	const AND: SQL[] = [];

	if (key && query) {
		if (key === 'name') {
			AND.push(eq(remoteContent.name, query));
		} else if (key === 'filename') {
			AND.push(eq(remoteContent.name, query));
		} else if (key === 'labModule') {
			AND.push(eq(remoteContent.labModule, Number(query)));
		}
	}

	if (mimeType) {
		AND.push(eq(remoteContent.mimeType, mimeType as dMimeType));
	}

	if (key !== 'filename') {
		if (contentType) {
			AND.push(eq(remoteContent.contentType, contentType as dContentType));
		}

		if (contentPlacement) {
			AND.push(
				eq(
					remoteContent.contentPlacement,
					contentPlacement as dContentPlacement
				)
			);
		}
	}

	if (!AND.length) throw new Error('Must provide valid search parameters!');

	return AND;
}
export async function findFirstContent(
	params: Content.GetParams
): Promise<Content.UIContent | undefined> {
	const dAND = buildDrizzleQuery(params);

	if (!dAND.length) throw new Error('Must provide valid search parameters!');

	const localContent = await sql.query.localContent.findFirst({
		where: and(...[...dAND, gt(dLocalContent.expiresAt, new Date())]),
	});

	if (localContent != null) {
		return UIContent(localContent);
	}

	// Fetch remote content
	const content = await drizzle.query.remoteContent.findFirst({
		where: and(...dAND),
	});

	if (content) {
		// Update local copy
		return await updateLocalContent(content);
	}
}

export async function findAllContent(
	params: Content.GetParams
): Promise<Content.UIContent[]> {
	const dAND = buildDrizzleQuery(params);

	const localContent = await sql.query.localContent.findMany({
		where: and(...[...dAND, gt(dLocalContent.expiresAt, new Date())]),
	});

	if (!localContent.length) {
		const content = await drizzle.query.remoteContent.findMany({
			where: and(...dAND),
		});

		return updateLocalContent(content);
	}

	return UIContent(localContent);
}

export async function getContentById(id: string) {
	const localContent = await sql.query.localContent.findFirst({
		where: eq(dLocalContent.id, id),
	});

	if (localContent != null) return UIContent(localContent);

	// Check remote
	const remote = await drizzle.query.remoteContent.findFirst({
		where: eq(remoteContent.id, id),
	});

	if (remote != null) {
		// Update local copy
		return await updateLocalContent(remote);
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
	const remote = await drizzle.query.remoteContent.findMany();

	await updateLocalContent(remote);
}
// =====================================================

export async function updateLocalContent(
	data: Content.RemoteContentModel
): Promise<Content.UIContent>;
export async function updateLocalContent(
	data: Content.RemoteContentModel[]
): Promise<Content.UIContent[]>;
export async function updateLocalContent(
	data: Content.RemoteContentModel | Content.RemoteContentModel[]
): Promise<Content.UIContent | Content.UIContent[]> {
	const lastSyncedAt = new Date();
	const expiresAt = new Date(lastSyncedAt.getTime() + 1000 * 60 * 24); // 30 minutes

	const isArray = Array.isArray(data);
	const _data = isArray ? data : [data];
	const localContent = await sql.transaction(async (tx) => {
		await Promise.all(
			_data.map((c) => {
				const content: Content.LocalContentModel = {
					...c,
					createdAt: getDateTime(c.createdAt, 'date'),
					updatedAt: getDateTime(c.updatedAt, 'date'),
					lastSyncedAt,
					expiresAt,
					applicationData: c?.applicationData as string,
				};
				return tx.insert(dLocalContent).values(content).onConflictDoUpdate({
					target: dLocalContent.id,
					set: content,
				});
			})
		);
		return await tx.query.localContent.findMany();
	});

	if (isArray) {
		return UIContent(localContent);
	}

	return UIContent(localContent[0]);
}

function UIContent(content: Content.LocalContentModel): Content.UIContent;
function UIContent(content: Content.LocalContentModel[]): Content.UIContent[];
function UIContent(
	content: Content.LocalContentModel | Content.LocalContentModel[]
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
					? c.textData?.replaceAll('./assets', `${ASSET_URL}/assets`)
					: undefined,
			contentPlacement: (c?.contentPlacement ??
				undefined) as Content.UIContentPlacement,
			contentType: c.contentType as Content.UIType,
			mimeType: c.mimeType as Content.UIMimeType,
			createdAt: getDateTime(c?.createdAt),
			updatedAt: getDateTime(c?.updatedAt),
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
