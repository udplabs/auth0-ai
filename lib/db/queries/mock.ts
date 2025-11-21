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

// Returns sample data from local database only.
export async function getSampleData(userId: string): Promise<{
	accounts: SampleAccount[];
	transactions: SampleTransaction[];
}> {
	const [
		{ convertToUI },
		{ sql },
		{ sampleAccount: dSampleAccount, sampleTransaction: dSampleTransaction },
		{ and, eq, gt },
	] = await Promise.all([
		import('@/lib/utils/db-converter'),
		import('@/lib/db/drizzle/sql/db'),
		import('@/lib/db/drizzle/sql/schema'),
		import('drizzle-orm'),
	]);

	const localSampleAccounts = await sql.query.sampleAccount.findMany({
		where: and(
			eq(dSampleAccount.customerId, userId),
			gt(dSampleAccount.expiresAt, new Date())
		),
	});

	const localSampleTransactions = await sql.query.sampleTransaction.findMany({
		where: and(
			eq(dSampleTransaction.customerId, userId),
			gt(dSampleTransaction.expiresAt, new Date())
		),
	});

	return {
		accounts: convertToUI(localSampleAccounts),
		transactions: convertToUI(localSampleTransactions),
	};
}
