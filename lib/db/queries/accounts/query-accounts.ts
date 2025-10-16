'use server';

import { sql } from '@/lib/db/drizzle/sql/db';
import { account as dAccount } from '@/lib/db/drizzle/sql/schema';
import { UIAccounts } from '@/lib/db/models';
import type { Accounts } from '@/types/accounts';
import { and, eq, inArray } from 'drizzle-orm';

export async function getExternalAccountsByUserId(userId: string) {
	const dbAccounts = await sql.query.account.findMany({
		where: and(eq(dAccount.customerId, userId), eq(dAccount.isExternal, true)),
		with: {
			transactions: true,
		},
	});

	return UIAccounts(dbAccounts);
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
	const dbAccounts = await sql.query.account.findMany({
		where: eq(dAccount.customerId, userId),
		with: { transactions: includeTransactions ? true : undefined },
	});

	return UIAccounts(dbAccounts);
}

export async function getAccountsByAccountId(
	accountIds: string[],
	includeTransactions = false
): Promise<Accounts.Account[]> {
	const dbAccounts = await sql.query.account.findMany({
		where: inArray(dAccount.id, accountIds),
		with: { transactions: includeTransactions ? true : undefined },
	});
	return UIAccounts(dbAccounts);
}
