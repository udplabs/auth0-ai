'use server';

import {
	Prisma,
	SampleDocument as SampleDocumentModel,
} from '@/lib/db/generated/prisma';
import { convertToUI } from '@/lib/utils/db-converter';
import { neon } from '../neon/client';
import { prisma } from '../prisma/client';

// Looks up locally first.
// If not found, fetches remotely and stores locally.
// This solves for if the local database is wiped.
export async function getSampleData(userId: string): Promise<{
	accounts: Accounts.Account[];
	transactions: Accounts.Transaction[];
	documents: Documents.DocumentWithEmbedding[];
}> {
	const lastSyncedAt = new Date();
	const expiresAt = new Date(lastSyncedAt.getTime() + 1000 * 60 * 30); // 30 minutes

	let localSampleAccounts = await prisma.sampleAccount.findMany({
		where: { AND: [{ customerId: userId }, { expiresAt: { gt: new Date() } }] },
	});

	if (localSampleAccounts.length === 0) {
		const remoteAccounts = await neon.remoteSampleAccount.findMany({
			where: { customerId: userId },
		});

		await prisma.$transaction([
			...remoteAccounts.map(({ updatedAt: _, ...a }) => {
				return prisma.sampleAccount.upsert({
					where: { id: a.id },
					update: {
						...a,
						lastSyncedAt,
						expiresAt,
					},
					create: {
						...a,
						lastSyncedAt,
						expiresAt,
					},
				});
			}),
		]);

		await prisma.sampleAccount.createMany({
			data: remoteAccounts,
		});

		localSampleAccounts = await prisma.sampleAccount.findMany({
			where: { customerId: userId },
		});
	}

	let localSampleTransactions = await prisma.sampleTransaction.findMany({
		where: { AND: [{ customerId: userId }, { expiresAt: { gt: new Date() } }] },
	});

	if (localSampleTransactions.length === 0) {
		const remoteTransactions = await neon.remoteSampleTransaction.findMany({
			where: { customerId: userId },
		});

		await prisma.$transaction([
			...remoteTransactions.map(({ updated_at: _, ...t }) => {
				return prisma.sampleTransaction.upsert({
					where: { id: t.id },
					update: {
						...t,
						lastSyncedAt,
						expiresAt,
					} as Prisma.SampleTransactionUpdateInput,
					create: {
						...t,
						lastSyncedAt,
						expiresAt,
					} as Prisma.SampleTransactionCreateInput,
				});
			}),
		]);

		localSampleTransactions = await prisma.sampleTransaction.findMany({
			where: { customerId: userId },
		});
	}

	const lookupIds = [...localSampleTransactions.map((t) => t.id)];

	let localSampleDocuments = await prisma.sampleDocument.findMany({
		where: {
			AND: [{ id: { in: lookupIds } }, { expiresAt: { gt: new Date() } }],
		},
	});

	if (localSampleDocuments.length === 0) {
		const remoteSampleDocuments = await neon.remoteSampleDocument.findMany({
			where: { id: { in: lookupIds } },
		});

		await prisma.$transaction([
			...remoteSampleDocuments.map(({ updatedAt: _, ...d }) => {
				return prisma.sampleDocument.upsert({
					where: { id: d.id },
					update: {
						...d,
						lastSyncedAt,
						expiresAt,
					} as Prisma.SampleDocumentUpdateInput,
					create: {
						...d,
						lastSyncedAt,
						expiresAt,
					} as Prisma.SampleDocumentCreateInput,
				});
			}),
		]);

		localSampleDocuments = await prisma.sampleDocument.findMany({
			where: { id: { in: lookupIds } },
		});
	}

	return {
		accounts: convertToUI(localSampleAccounts),
		transactions: convertToUI(localSampleTransactions),
		documents: convertToUI<
			SampleDocumentModel[],
			Documents.DocumentWithEmbedding[]
		>(localSampleDocuments),
	};
}

export async function deleteSampleDocuments() {
	// Delete local
	await prisma.sampleDocument.deleteMany();
	// Delete remote
	return await neon.remoteSampleDocument.deleteMany();
}
