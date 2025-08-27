import { convertToUI } from '@/lib/utils/db-converter';
import { prisma } from '../prisma/client';

import { Document } from '@/lib/db/generated/prisma';

export async function getSampleData(userId: string): Promise<{
	accounts: Accounts.Account[];
	transactions: Accounts.Transaction[];
	documents: Documents.DocumentWithEmbedding[];
}> {
	const accounts = await prisma.sampleAccount.findMany({
		where: { customerId: userId },
	});

	const transactions = await prisma.sampleTransaction.findMany({
		where: { customerId: userId },
	});

	const lookupIds = [
		...accounts.map((a) => a.id),
		...transactions.map((t) => t.id),
	];

	const docs = await prisma.sampleDocument.findMany({
		where: { id: { in: lookupIds } },
	});

	return {
		accounts: convertToUI(accounts),
		transactions: convertToUI(transactions),
		documents: convertToUI<Document[], Documents.DocumentWithEmbedding[]>(docs),
	};
}
