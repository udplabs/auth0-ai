import { sortBy } from '@/lib/utils';
import type { Transactions } from '@/types/transactions';
import { getAccounts } from './get-accounts';

interface GetTransactionsParams {
	accountId?: string;
	userId: string;
	limit?: number;
	startDate?: string;
	endDate?: string;
	sortOrder?: SortOrder;
}
export async function getTransactions({
	accountId,
	userId,
	limit,
	startDate,
	endDate,
	sortOrder,
}: GetTransactionsParams) {
	// We are cheating for now and just fetching the account w/ transactions.
	// Easier since we are handling permissions at the account level (for now).
	const accounts = await getAccounts({ userId, includeTransactions: true });

	if (accountId) {
		const account = accounts.find((a) => a.id === accountId);

		return account?.transactions;
	}

	const result = accounts.flatMap((a) => a.transactions || []);

	if (limit && limit > 0) {
		return result.splice(0, limit);
	}

	return filterTransactions(result, { startDate, endDate, sortOrder });
}

function filterTransactions(
	transactions: Transactions.Transaction[],
	{
		startDate,
		endDate,
		sortOrder = 'desc',
	}: Pick<GetTransactionsParams, 'startDate' | 'endDate' | 'sortOrder'>
) {
	// Skip filtering unless necessary
	if (startDate || endDate) {
		const start = startDate ? new Date(startDate) : new Date(0);
		const end = endDate ? new Date(endDate) : new Date();
		const filtered = transactions.filter((tx) => {
			const txDate = new Date(tx.date);
			return txDate >= start && txDate <= end;
		});

		return sortBy(filtered, 'date', sortOrder);
	}

	return sortBy(transactions, 'date', sortOrder);
}
