import { sql } from '@/lib/db/drizzle/sql/db';
import {
	transaction as dTransaction,
	transfer as dTransfer,
	type TransferModelCreate,
} from '@/lib/db/drizzle/sql/schema';
import { DBTransaction, UITransactions } from '@/lib/db/models';
import { APIError } from '@/lib/errors';
import { ulid } from '@/lib/utils';
import type { Transactions } from '@/types/transactions';
import { inArray } from 'drizzle-orm';

export async function saveTransactions(
	data: Transactions.CreateTransactionInputNoAccount[],
	accountId?: string
): Promise<Transactions.Transaction[]> {
	const createdTransactions = await sql.transaction(async (tx) => {
		const ids: string[] = [];

		await Promise.all(
			data.map(({ id = ulid(), accountId: _accountId = accountId, ...t }) => {
				if (!_accountId) {
					throw new APIError('bad_request:database', 'accountId is required');
				}
				ids.push(id);
				return tx
					.insert(dTransaction)
					.values(DBTransaction({ id, accountId: _accountId, ...t }));
			})
		);

		return await tx.query.transaction.findMany({
			where: inArray(dTransaction.id, ids),
		});
	});

	return UITransactions(createdTransactions);
}

export async function createTransfer(data: TransferModelCreate) {
	const [result] = await sql.insert(dTransfer).values(data).returning();
	return result;
}
