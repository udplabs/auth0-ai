'use server';

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
	const [
		{ convertToUI },
		{ getRemoteSampleAccounts, getRemoteSampleTransactions },
		{ sql },
		{ sampleAccount: dSampleAccount, sampleTransaction: dSampleTransaction },
		{ and, eq, gt },
	] = await Promise.all([
		import('@/lib/utils/db-converter'),
		import('@/lib/db/drizzle/supabase/db'),
		import('@/lib/db/drizzle/sql/db'),
		import('@/lib/db/drizzle/sql/schema'),
		import('drizzle-orm'),
	]);

	const lastSyncedAt = new Date();
	const expiresAt = new Date(lastSyncedAt.getTime() + 1000 * 60 * 30); // 30 minutes

	let localSampleAccounts = await sql.query.sampleAccount.findMany({
		where: and(
			eq(dSampleAccount.customerId, userId),
			gt(dSampleAccount.expiresAt, new Date())
		),
	});

	if (localSampleAccounts.length === 0) {
		const remoteAccounts = await getRemoteSampleAccounts(userId);

		localSampleAccounts = await sql.transaction(async (tx) => {
			await Promise.all(
				remoteAccounts.map((a) => {
					const account = {
						...a,
						lastSyncedAt,
						expiresAt,
						createdAt: new Date(a?.createdAt),
						updatedAt: new Date(a?.updatedAt),
						dueDate: a?.dueDate ? new Date(a.dueDate) : undefined,
						openedDate: a?.openedDate ? new Date(a.openedDate) : new Date(),
						closedDate: a?.closedDate ? new Date(a.closedDate) : undefined,
						lastPaymentDate: a?.lastPaymentDate
							? new Date(a.lastPaymentDate)
							: undefined,
						nextPaymentDate: a?.nextPaymentDate
							? new Date(a.nextPaymentDate)
							: undefined,
					};
					return tx.insert(dSampleAccount).values(account).onConflictDoUpdate({
						target: dSampleAccount.id,
						set: account,
					});
				})
			);

			return await tx.query.sampleAccount.findMany({
				where: eq(dSampleAccount.customerId, userId),
			});
		});
	}

	let localSampleTransactions = await sql.query.sampleTransaction.findMany({
		where: and(
			eq(dSampleAccount.customerId, userId),
			gt(dSampleAccount.expiresAt, new Date())
		),
	});

	if (localSampleTransactions.length === 0) {
		const remoteTransactions = await getRemoteSampleTransactions(userId);

		localSampleTransactions = await sql.transaction(async (tx) => {
			await Promise.all(
				remoteTransactions.map((t) => {
					const transaction = {
						...t,
						lastSyncedAt,
						expiresAt,
						createdAt: new Date(t?.createdAt),
						updatedAt: new Date(t?.updatedAt),
						date: new Date(t?.date ?? new Date()),
					};
					return tx
						.insert(dSampleTransaction)
						.values(transaction)
						.onConflictDoUpdate({
							target: dSampleTransaction.id,
							set: transaction,
						});
				})
			);

			return await tx.query.sampleTransaction.findMany({
				where: eq(dSampleTransaction.customerId, userId),
			});
		});
	}

	return {
		accounts: convertToUI(localSampleAccounts),
		transactions: convertToUI(localSampleTransactions),
	};
}
