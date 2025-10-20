'use server';

import { sql } from '@/lib/db/drizzle/sql/db';
import { transaction as dTransaction } from '@/lib/db/drizzle/sql/schema';
import { UITransactions } from '@/lib/db/models';
import { getAccountsByUserId } from '@/lib/db/queries/accounts/query-accounts';
import { desc, eq } from 'drizzle-orm';

import type { Transactions } from '@/types/transactions';
export async function getTransactionsByAccountId(
	accountId: string
): Promise<Transactions.Transaction[]> {
	const transactions = await sql.query.transaction.findMany({
		where: eq(dTransaction.accountId, accountId),
		orderBy: desc(dTransaction.date),
	});

	return UITransactions(transactions);
}

export async function getTransactionsByUserId(
	userId: string
): Promise<Transactions.Transaction[]> {
	const accounts = await getAccountsByUserId(userId, true);

	return accounts.flatMap(({ transactions = [] }) => transactions);
}
