import { getAccounts } from './get-accounts';

export async function getTransactions({
	accountId,
	userId,
}: {
	accountId?: string;
	userId: string;
}) {
	// We are cheating for now and just fetching the account w/ transactions.
	// Easier since we are handling permissions at the account level (for now).
	const accounts = await getAccounts(userId, true);

	if (accountId) {
		const account = accounts.find((a) => a.id === accountId);

		return account?.transactions;
	}

	return accounts.flatMap((a) => a.transactions || []);
}
