'use server';

import type {
	Account as AccountModel,
	Prisma,
	Transaction as TransactionModel,
	Transfer as TransferModel,
} from '../../generated/prisma';
import { prisma } from '../../prisma/client';

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

	const [{ uniqBy }, { convertToDB, convertToUI }] = await Promise.all([
		import('lodash-es'),
		import('@/lib/utils/db-converter'),
	]);

	// 2) Convert to DB format
	// This is necessary to ensure the data is in the correct format for Prisma
	const dbAccounts = convertToDB<
		Accounts.CreateAccountInput[],
		Prisma.AccountCreateManyInput[]
	>(accounts);

	const dbTransactions = convertToDB<
		Accounts.CreateTransactionInput[],
		Prisma.TransactionCreateManyInput[]
	>(uniqBy(transactions, 'id'));

	const createdAccounts = await prisma.account.createManyAndReturn({
		data: dbAccounts,
	});

	const uiAccounts = convertToUI<AccountModel[], Accounts.Account[]>(
		createdAccounts
	);

	if (dbTransactions.length > 0) {
		// 2) Save transactions
		const createdTransactions = await prisma.transaction.createManyAndReturn({
			data: dbTransactions,
		});

		// 3) Convert transactions to UI format
		const uiTransactions = convertToUI<
			TransactionModel[],
			Accounts.Transaction[]
		>(createdTransactions);

		return { accounts: uiAccounts, transactions: uiTransactions };
	}

	return { accounts: uiAccounts, transactions: [] };
}

export async function updateBalances(transfer: TransferModel) {
	const { fromAccountId, toAccountId, amount } = transfer;

	const fromAccount = await prisma.account.findUnique({
		where: { id: fromAccountId },
	});
	const toAccount = await prisma.account.findUnique({
		where: { id: toAccountId },
	});

	await prisma.$transaction([
		prisma.account.update({
			where: { id: fromAccountId },
			data: {
				balance: { decrement: amount },
				...(fromAccount?.type === 'deposit' && {
					availableBalance: { decrement: amount },
				}),
			},
		}),
		prisma.account.update({
			where: { id: toAccountId },
			data: {
				balance: { increment: amount },
				...(toAccount?.type === 'deposit' && {
					availableBalance: { increment: amount },
				}),
				...(toAccount?.type === 'loan' && {
					balanceDue: Math.max(0, (toAccount?.balanceDue || 0) - amount),
				}),
			},
		}),
	]);
}

export async function deleteAccountData(userId: string) {
	// Delete Documents
	await prisma.document.deleteMany({
		where: { userId },
	});
	// Delete Transactions
	await prisma.transaction.deleteMany({
		where: { customerId: userId },
	});
	// Delete Accounts
	await prisma.account.deleteMany({
		where: { customerId: userId },
	});
}
