'use server';

import { convertToUI } from '@/lib/utils/db-converter';
import { AccountModel, AccountWhereInput } from '../../generated/prisma/models';
import { prisma } from '../../prisma/client';

import type { Accounts } from '@/types/accounts';

export async function getExternalAccountsByUserId(userId: string) {
	const dbAccounts = await prisma.account.findMany({
		where: { customerId: userId, isExternal: true },
		include: { transactions: true },
	});

	return convertToUI<AccountModel[], Accounts.Account[]>(dbAccounts);
}

export async function getAccountsByUserId(
	userId: string,
	includeTransactions?: boolean
): Promise<Accounts.Account[]>;
export async function getAccountsByUserId(
	userId: string,
	includeTransactions: true
): Promise<Accounts.Account[]>;
export async function getAccountsByUserId(
	userId: string,
	includeTransactions: false
): Promise<Accounts.Account[]>;
export async function getAccountsByUserId(
	userId: string,
	includeTransactions?: boolean
): Promise<Accounts.Account[] | Accounts.AccountWithoutTransactions[]> {
	const dbAccounts = await prisma.account.findMany({
		where: { customerId: userId },
		include: includeTransactions ? { transactions: true } : undefined,
	});
	return convertToUI<AccountModel[], Accounts.Account[]>(dbAccounts);
}

export async function getAccountsByAccountId(
	accountIds: string[],
	includeTransactions = false
): Promise<Accounts.Account[]> {
	const dbAccounts = await prisma.account.findMany({
		where: { id: { in: accountIds } },
		include: { transactions: includeTransactions },
	});
	return convertToUI<AccountModel[], Accounts.Account[]>(dbAccounts);
}

// THIS IS AN INTERNAL FUNCTION USED ONLY TO GENERATE THE VECTOR DB
// DO NOT USE THIS IN ANY API ROUTES
export async function getAllAccounts(
	where?: AccountWhereInput
): Promise<Accounts.Account[]> {
	const dbAccounts = await prisma.account.findMany(
		where ? { where } : undefined
	);
	return convertToUI<AccountModel[], Accounts.Account[]>(dbAccounts);
}
