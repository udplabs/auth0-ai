import { prisma } from '@/lib/db/prisma/client';
import {
	TransactionCreateManyInput,
	TransferCreateInput,
} from '../../generated/prisma/models';

export async function createTransactions(data: TransactionCreateManyInput[]) {
	return await prisma.transaction.createMany({
		data: data.map((t) => ({
			...t,
			date: typeof t?.date === 'string' ? new Date() : t?.date,
		})),
	});
}

export async function createTransfer({
	createdAt,
	updatedAt,
	...data
}: TransferCreateInput) {
	return await prisma.transfer.create({
		data: {
			...data,
			createdAt:
				typeof createdAt === 'string' ? new Date(createdAt) : createdAt,
			updatedAt:
				typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt,
		},
	});
}
