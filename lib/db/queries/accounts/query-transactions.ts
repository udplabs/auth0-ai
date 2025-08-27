import { convertToUI } from '@/lib/utils/db-converter';
import { Transaction as DBTransaction, Prisma } from '../../generated/prisma';
import { prisma } from '../../prisma/client';
import { getAccountsByUserId } from './query-accounts';

export async function getTransactionsByAccountId(
	accountId: string
): Promise<Accounts.Transaction[]> {
	const transactions = await prisma.transaction.findMany({
		where: {
			accountId,
		},
		orderBy: { date: 'desc' },
	});

	return convertToUI<DBTransaction[], Accounts.Transaction[]>(transactions);
}

export async function getTransactionsByUserId(
	userId: string
): Promise<Accounts.Transaction[]> {
	const accounts = await getAccountsByUserId(userId, true);

	return accounts.flatMap(({ transactions = [] }) => transactions);
}

// THIS IS AN INTERNAL FUNCTION USED ONLY TO GENERATE THE VECTOR DB
// DO NOT USE THIS IN ANY API ROUTES
export async function getAllTransactions(
	where?: Prisma.TransactionWhereInput
): Promise<Accounts.Transaction[]> {
	const transactions = await prisma.transaction.findMany({
		orderBy: { date: 'desc' },
		where,
	});

	return convertToUI<DBTransaction[], Accounts.Transaction[]>(transactions);
}
