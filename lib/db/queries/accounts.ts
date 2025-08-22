import { convertToDB, convertToUI } from '@/lib/utils/db-converter';
import { uniqBy } from 'lodash-es';
import { prisma } from '../client';
import { Account, Prisma, Transaction } from '../generated/prisma';

export async function saveAccounts(
	accounts: Accounts.CreateAccountInput[],
	transactions: Accounts.CreateTransactionInput[]
): Promise<void> {
	await saveAccountsAndTransactions(accounts, transactions);
}

export async function saveAccountsAndReturnCombined(
	accounts: Accounts.CreateAccountInput[],
	transactions?: Accounts.CreateTransactionInput[]
): Promise<Accounts.Account[]> {
	const { accounts: uiAccounts, transactions: uiTransactions } =
		await saveAccountsAndTransactions(accounts, transactions);

	const combinedAccounts: Accounts.Account[] = [];

	if (uiTransactions.length > 0) {
		uiAccounts.forEach((account) => {
			combinedAccounts.push({
				...account,
				transactions: uiTransactions.filter(
					(tx) => tx.accountId === account.id
				),
			} as Accounts.Account);
		});
	}

	return combinedAccounts;
}

export async function saveAccountsAndReturnSeparate(
	accounts: Accounts.CreateAccountInput[],
	transactions?: Accounts.CreateTransactionInput[]
): Promise<Accounts.SeparatedResponse> {
	return await saveAccountsAndTransactions(accounts, transactions);
}

async function saveAccountsAndTransactions(
	accounts: Accounts.CreateAccountInput[],
	transactions: Accounts.CreateTransactionInput[] = []
): Promise<Accounts.SeparatedResponse> {
	const _accounts: Accounts.CreateAccountInput[] = [];

	// 1) Check for nested transactions and separate them if present
	// These need to be created separately as createMany does not support nested createMany
	for (const account of accounts) {
		const { transactions: tx = [], ...rest } = account;
		_accounts.push(rest);
		if (tx.length > 0) {
			transactions.push(...tx);
		}
	}

	// 2) Convert to DB format
	// This is necessary to ensure the data is in the correct format for Prisma
	const uiAccounts = convertToDB<
		Accounts.CreateAccountInput[],
		Prisma.AccountCreateManyInput[]
	>(accounts);

	const uiTransactions = convertToDB<
		Accounts.CreateTransactionInput[],
		Prisma.TransactionCreateManyInput[]
	>(uniqBy(transactions, 'id'));

	const dbAccounts = await prisma.account.createManyAndReturn({
		data: uiAccounts,
	});

	const createdAccounts = convertToUI<Account[], Accounts.Account[]>(
		dbAccounts
	);

	if (uiTransactions.length > 0) {
		// 2) Save transactions
		const dbTransactions = await prisma.transaction.createManyAndReturn({
			data: uiTransactions,
		});

		// 3) Convert transactions to UI format
		const createdTransactions = convertToUI<
			Transaction[],
			Accounts.Transaction[]
		>(dbTransactions);

		return { accounts: createdAccounts, transactions: createdTransactions };
	}

	return { accounts: createdAccounts, transactions: [] };
}

export async function getExternalAccountsByUserId(userId: string) {
	const dbAccounts = await prisma.account.findMany({
		where: { customerId: userId, isExternal: true },
		include: { transactions: true },
	});

	return convertToUI<Account[], Accounts.Account[]>(dbAccounts);
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
	return convertToUI<Account[], Accounts.Account[]>(dbAccounts);
}

export async function listAccountsByCustomerId(
	customerId: string
): Promise<Accounts.Account[]> {
	const dbAccounts = await prisma.account.findMany({
		where: { customerId },
	});
	return convertToUI<Account[], Accounts.Account[]>(dbAccounts);
}

export async function getAccountsByAccountId(
	accountIds: string[],
	includeTransactions = false
): Promise<Accounts.Account[]> {
	const dbAccounts = await prisma.account.findMany({
		where: { id: { in: accountIds } },
		include: { transactions: includeTransactions },
	});
	return convertToUI<Account[], Accounts.Account[]>(dbAccounts);
}

// THIS IS AN INTERNAL FUNCTION USED ONLY TO GENERATE THE VECTOR DB
// DO NOT USE THIS IN ANY API ROUTES
export async function getAllAccounts(
	where?: Prisma.AccountWhereInput
): Promise<Accounts.Account[]> {
	const dbAccounts = await prisma.account.findMany(
		where ? { where } : undefined
	);
	return convertToUI<Account[], Accounts.Account[]>(dbAccounts);
}
