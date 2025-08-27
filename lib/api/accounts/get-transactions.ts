import {
	getTransactionsByAccountId,
	getTransactionsByUserId,
} from '@/lib/db/queries/accounts';

export async function getTransactions({
	accountId,
	userId,
}: {
	accountId?: string;
	userId?: string;
}) {
	if (accountId) {
		return await getTransactionsByAccountId(accountId);
	}
	if (userId) {
		return await getTransactionsByUserId(userId);
	}

	return [];
}
