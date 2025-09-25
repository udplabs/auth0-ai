'use server';

import type {
	SampleTransactionCreateInput,
	SampleTransactionUpdateInput,
} from '@/lib/db/generated/prisma/models';

import type { Accounts } from '@/types/accounts';
import type { Transactions } from '@/types/transactions';

type SampleAccount = Accounts.Account & {
	lastSyncedAt?: Date;
	expiresAt?: Date;
};
type SampleTransaction = Transactions.Transaction & {
	lastSyncedAt?: Date;
	expiresAt?: Date;
};

// Looks up locally first.
// If not found, fetches remotely and stores locally.
// This solves for if the local database is wiped.
export async function getSampleData(userId: string): Promise<{
	accounts: SampleAccount[];
	transactions: SampleTransaction[];
}> {
	const [{ prisma }, { supabase }, { convertToUI }] = await Promise.all([
		import('@/lib/db/prisma/client'),
		import('@/lib/db/supabase/client'),
		import('@/lib/utils/db-converter'),
	]);

	const lastSyncedAt = new Date();
	const expiresAt = new Date(lastSyncedAt.getTime() + 1000 * 60 * 30); // 30 minutes

	let localSampleAccounts = await prisma.sampleAccount.findMany({
		where: { AND: [{ customerId: userId }, { expiresAt: { gt: new Date() } }] },
	});

	if (localSampleAccounts.length === 0) {
		const remoteAccounts = await supabase.remoteSampleAccount.findMany({
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
		const remoteTransactions = await supabase.remoteSampleTransaction.findMany({
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

	return {
		accounts: convertToUI(localSampleAccounts),
		transactions: convertToUI(localSampleTransactions),
	};
}
