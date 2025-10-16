'use server';

import { decrement, increment, sql } from '@/lib/db/drizzle/sql/db';
import {
	account as dAccount,
	transaction as dTransaction,
	type AccountModelCreate,
	type TransferModel,
} from '@/lib/db/drizzle/sql/schema';
import { DBAccount, UIAccount } from '@/lib/db/models';
import { saveTransactions } from '@/lib/db/queries/accounts/mutate-transactions';
import { eq } from 'drizzle-orm';

import type { Accounts } from '@/types/accounts';
import type { Transactions } from '@/types/transactions';

// TODO: Rewrite to be more testable! Current id generation is crap.
export async function saveAccount(
	account: Accounts.CreateAccountInputWithoutTransactions
): Promise<Accounts.AccountWithoutTransactions>;
export async function saveAccount(
	account: Accounts.CreateAccountInput
): Promise<Accounts.Account>;
export async function saveAccount(
	account:
		| Accounts.CreateAccountInput
		| Accounts.CreateAccountInputWithoutTransactions
): Promise<Accounts.Account | Accounts.AccountWithoutTransactions> {
	const transactions: Transactions.CreateTransactionInputNoAccount[] = [];

	let dbAccount: AccountModelCreate;

	if ('transactions' in account && account?.transactions?.length) {
		const { transactions: txs, ...rest } = account;
		dbAccount = DBAccount(rest);
		transactions.push(...txs);
	} else {
		dbAccount = DBAccount(account);
	}

	// Create account first
	const [createdDbAccount] = await sql
		.insert(dAccount)
		.values(dbAccount)
		.returning();

	// Then create transactions if they exist
	if (transactions.length > 0) {
		const createdDbTransactions = await saveTransactions(
			transactions,
			createdDbAccount.id
		);

		return {
			...UIAccount(createdDbAccount),
			transactions: createdDbTransactions,
		} as Accounts.Account;
	}

	return UIAccount(createdDbAccount) as Accounts.AccountWithoutTransactions;
}

export async function saveAccounts(
	accounts: Accounts.CreateAccountInput[]
): Promise<Accounts.Account[]>;
export async function saveAccounts(
	accounts: Accounts.CreateAccountInputWithoutTransactions[]
): Promise<Accounts.AccountWithoutTransactions[]>;
export async function saveAccounts(
	accounts: (
		| Accounts.CreateAccountInput
		| Accounts.CreateAccountInputWithoutTransactions
	)[]
): Promise<(Accounts.Account | Accounts.AccountWithoutTransactions)[]> {
	const withTransactions: Accounts.Account[] = [];
	const withoutTransactions: Accounts.AccountWithoutTransactions[] = [];

	for (const account of accounts) {
		if ('transactions' in account && account?.transactions?.length) {
			withTransactions.push(
				await saveAccount(account as Accounts.CreateAccountInput)
			);
		} else {
			withoutTransactions.push(
				await saveAccount(
					account as Accounts.CreateAccountInputWithoutTransactions
				)
			);
		}
	}

	if (withTransactions.length > 0) {
		return withTransactions;
	}

	return withoutTransactions;
}

interface AccountsSeparatedResponse {
	accounts: Accounts.AccountWithoutTransactions[];
	transactions: Transactions.Transaction[];
}

/**
 * This function assumes that accounts do NOT have transactions and transactions DO have an `accountId`.
 * It's basically a convenience batcher.
 */
export async function saveAccountsAndTransactions(
	accounts: Accounts.CreateAccountInputWithoutTransactions[],
	transactions: Transactions.CreateTransactionInput[] = []
): Promise<AccountsSeparatedResponse> {
	const createdAccounts = await saveAccounts(accounts);
	const createdTransactions = await saveTransactions(transactions);

	return { accounts: createdAccounts, transactions: createdTransactions };
}

export async function updateBalances(transfer: TransferModel) {
	const { fromAccountId, toAccountId, amount } = transfer;

	const fromAccount = await sql.query.account.findFirst({
		where: eq(dAccount.id, fromAccountId),
	});
	const toAccount = await sql.query.account.findFirst({
		where: eq(dAccount.id, toAccountId),
	});

	await sql.transaction(async (tx) => {
		await tx
			.update(dAccount)
			.set({
				balance: decrement(dAccount.balance, amount),
				...(fromAccount?.type === 'deposit' && {
					availableBalance: decrement(dAccount.availableBalance, amount),
				}),
			})
			.where(eq(dAccount.id, fromAccountId));

		await tx
			.update(dAccount)
			.set({
				balance: increment(dAccount.balance, amount),
				...(toAccount?.type === 'deposit' && {
					availableBalance: increment(dAccount.availableBalance, amount),
				}),
				...(toAccount?.type === 'loan' && {
					balanceDue: Math.max(0, (toAccount?.balanceDue || 0) - amount),
				}),
			})
			.where(eq(dAccount.id, toAccountId));
	});
}

export async function deleteAccountData(userId: string) {
	// Delete Transactions
	await sql.delete(dTransaction).where(eq(dTransaction.customerId, userId));
	// Delete Accounts
	await sql.delete(dAccount).where(eq(dAccount.customerId, userId));
}
