'use server';

import type {
	SampleDocumentCreateInput,
	SampleDocumentModel,
	SampleDocumentUpdateInput,
	SampleTransactionCreateInput,
	SampleTransactionUpdateInput,
} from '@/lib/db/generated/prisma/models';

import type { Accounts } from '@/types/accounts';
import type { Documents } from '@/types/documents';
import type { Transactions } from '@/types/transactions';

type SampleAccount = Accounts.Account & {
	lastSyncedAt?: Date;
	expiresAt?: Date;
};
type SampleTransaction = Transactions.Transaction & {
	lastSyncedAt?: Date;
	expiresAt?: Date;
};
type SampleDocument = Documents.DocumentWithEmbedding & {
	lastSyncedAt?: Date;
	expiresAt?: Date;
};

// Looks up locally first.
// If not found, fetches remotely and stores locally.
// This solves for if the local database is wiped.
export async function getSampleData(userId: string): Promise<{
	accounts: SampleAccount[];
	transactions: SampleTransaction[];
	documents: SampleDocument[];
}> {
	const [{ prisma }, { neon }, { convertToUI }] = await Promise.all([
		import('@/lib/db/prisma/client'),
		import('@/lib/db/neon/client'),
		import('@/lib/utils/db-converter'),
	]);

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
					} as SampleTransactionUpdateInput,
					create: {
						...t,
						lastSyncedAt,
						expiresAt,
					} as SampleTransactionCreateInput,
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
					} as SampleDocumentUpdateInput,
					create: {
						...d,
						lastSyncedAt,
						expiresAt,
					} as SampleDocumentCreateInput,
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
		documents: convertToUI<SampleDocumentModel[], SampleDocument[]>(
			localSampleDocuments
		),
	};
}

export async function deleteSampleDocuments() {
	const [{ prisma }, { neon }] = await Promise.all([
		import('@/lib/db/prisma/client'),
		import('@/lib/db/neon/client'),
	]);
	// Delete local
	await prisma.sampleDocument.deleteMany();
	// Delete remote
	return await neon.remoteSampleDocument.deleteMany();
}
