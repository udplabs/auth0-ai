'use server';

import { prisma } from '../../prisma/client';
import { updateBalances } from './mutate-accounts';

interface CreateTransferInput extends Transfers.TransactionCreateInput {
	fromAccountId: string;
	toAccountId: string;
	fromAccountNumber: string;
	toAccountNumber: string;
	customerId: string;
	amount: number;
}

export async function createTransfer(data: CreateTransferInput) {
	const {
		fromAccountId,
		toAccountId,
		fromAccountNumber,
		toAccountNumber,
		description = `Transfer from ${fromAccountNumber} to ${toAccountNumber}`,
		...tx
	} = data;

	const transfer = await prisma.transfer.create({
		data: {
			fromAccountId,
			toAccountId,
			description,
			...tx,
		},
	});

	const rootTransaction = {
		description,
		categoryId: '6012',
		categoryName: 'Transfers',
		budgetCategory: 'Transfers',
		tags: ['transfer'],
		...tx,
	};

	await prisma.transaction.createMany({
		data: [
			{
				...rootTransaction,
				accountId: fromAccountId,
				payee: toAccountNumber,
				rawPayee: toAccountNumber,
				type: 'debit',
			},
			{
				...rootTransaction,
				accountId: toAccountId,
				payee: fromAccountNumber,
				rawPayee: fromAccountNumber,
				type: 'credit',
			},
		],
	});

	await updateBalances(transfer);

	return transfer;
}
