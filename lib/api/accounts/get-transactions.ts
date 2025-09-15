import { getAccounts } from './get-accounts';

export async function getTransactions({
	accountId,
	userId,
	limit,
}: {
	accountId?: string;
	userId: string;
	limit?: number;
}) {
	// We are cheating for now and just fetching the account w/ transactions.
	// Easier since we are handling permissions at the account level (for now).
	const accounts = await getAccounts(userId, true);

	if (accountId) {
		const account = accounts.find((a) => a.id === accountId);

		return account?.transactions;
	}

	const result = accounts.flatMap((a) => a.transactions || []);

	if (limit && limit > 0) {
		return result.splice(0, limit);
	}

	return result;
}
