'use server';

import { getAccountsByUserId } from '@/lib/db/queries/accounts/query-accounts';
import { convertToUI } from '@/lib/utils/db-converter';
import {
	TransactionModel,
	TransactionWhereInput,
} from '../../generated/prisma/models';
import { prisma } from '../../prisma/client';

import type { Transactions } from '@/types/transactions';
export async function getTransactionsByAccountId(
	accountId: string
): Promise<Transactions.Transaction[]> {
	const transactions = await prisma.transaction.findMany({
		where: {
			accountId,
		},
		orderBy: { date: 'desc' },
	});

	return convertToUI<TransactionModel[], Transactions.Transaction[]>(
		transactions
	);
}

export async function getTransactionsByUserId(
	userId: string
): Promise<Transactions.Transaction[]> {
	const accounts = await getAccountsByUserId(userId, true);

	return accounts.flatMap(({ transactions = [] }) => transactions);
}

// THIS IS AN INTERNAL FUNCTION USED ONLY TO GENERATE THE VECTOR DB
// DO NOT USE THIS IN ANY API ROUTES
export async function getAllTransactions(
	where?: TransactionWhereInput
): Promise<Transactions.Transaction[]> {
	const transactions = await prisma.transaction.findMany({
		orderBy: { date: 'desc' },
		where,
	});

	return convertToUI<TransactionModel[], Transactions.Transaction[]>(
		transactions
	);
}
