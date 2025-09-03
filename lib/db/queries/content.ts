import { omit } from 'lodash-es';
import { Prisma as PrismaNeon, RemoteContent } from '../generated/neon';
import { ContentType, LocalContent, Prisma } from '../generated/prisma';
import { neon } from '../neon/client';
import { prisma } from '../prisma/client';

function getContentType(contentType: Content.UIType) {
	const dbContentType = contentType
		.replace('/', '_')
		.toUpperCase() as ContentType;
	return ContentType[dbContentType];
}

function getUIContentType(contentType: ContentType) {
	return contentType.replace('_', '/').toLowerCase() as Content.UIType;
}

export async function findFirstContent({
	name,
	filename,
	id,
	step,
	contentType,
	type,
}: Content.GetParams): Promise<Content.UIContent | undefined> {
	const AND:
		| Prisma.LocalContentWhereInput[]
		| PrismaNeon.RemoteContentWhereInput[] = [];

	if (filename) {
		AND.push({ name: { startsWith: `code_${filename}` } });
	} else if (name) {
		AND.push({ name: { contains: name } });
	} else if (step && step !== 'step-') {
		AND.push({ name: { startsWith: step } });
	}

	if (contentType) {
		AND.push({ contentType: { equals: getContentType(contentType) } });
	} else if (type) {
		AND.push({ type: { equals: type } });
	}

	if (!AND.length && !id)
		throw new Error('Must provide valid search parameters!');

	const localContent = await prisma.localContent.findFirst({
		where: id
			? { id }
			: {
					AND: [
						...AND,
						{ expiresAt: { gt: new Date() } },
					] as Prisma.LocalContentWhereInput[],
				},
	});

	if (localContent !== null) {
		return UIContent([localContent])[0];
	}

	// Fetch remote content
	const content = await neon.remoteContent.findFirst({
		where: id
			? { id }
			: { AND: [...AND] as PrismaNeon.RemoteContentWhereInput[] },
	});

	if (content && content !== null) {
		// Update local copy
		return (await updateLocalContent([content]))[0];
	}
}

export async function findAllContent({
	name,
	contentType,
	step,
	type,
}: Omit<Content.GetParams, 'id'>): Promise<Content.UIContent[]> {
	const AND: Prisma.LocalContentWhereInput[] = [];

	if (name) AND.push({ name: { equals: name } });

	if (contentType)
		AND.push({ contentType: { equals: getContentType(contentType) } });

	if (step) AND.push({ name: { startsWith: step } });

	if (type) AND.push({ type: { equals: type } });

	if (!AND.length) throw new Error('Must provide valid search parameters!');

	const localContent = await prisma.localContent.findMany({
		where: { AND: [...AND, { expiresAt: { gt: new Date() } }] },
	});

	if (!localContent.length) {
		const content = await neon.remoteContent.findMany({
			where: { AND: [...AND] as PrismaNeon.RemoteContentWhereInput[] },
		});

		return updateLocalContent(content);
	}

	return UIContent(localContent);
}

// Convenience wrapper
export async function getStepPrompts(
	step: string
): Promise<Content.UIContent[]> {
	return await findAllContent({ step, contentType: 'prompt/step' });
}

export async function getStepGuides(
	step: string
): Promise<Content.UIContent[]> {
	return await findAllContent({ step, contentType: 'guide/step' });
}

// Convenience wrapper to make initial app a bit faster
export async function syncContent(): Promise<void> {
	// Sync local content with remote content
	const remoteContent = await neon.remoteContent.findMany();

	await updateLocalContent(remoteContent);
}

export async function updateLocalContent(
	data: RemoteContent[]
): Promise<Content.UIContent[]> {
	const lastSyncedAt = new Date();
	const expiresAt = new Date(lastSyncedAt.getTime() + 1000 * 60 * 24); // 24 minutes

	const localContent = await prisma.$transaction([
		...data.map((c) => {
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
				},
			});
		}),
	]);

	return UIContent(localContent);
}

function UIContent(content: LocalContent[]): Content.UIContent[] {
	return content.map((c) =>
		omit(
			{
				...c,
				contentType: getUIContentType(c.contentType),
				createdAt: c.createdAt.toISOString(),
				updatedAt: c.updatedAt.toISOString(),
			},
			['expiresAt', 'lastSyncedAt']
		)
	);
}
