import useSWR from 'swr';
import { useUserProfile } from './use-user-profile';

import type { Transactions } from '@/types/transactions';

export const useTransactions = (accountId?: string) => {
	const { isAuthenticated } = useUserProfile();

	return useSWR<Transactions.Transaction[]>(
		isAuthenticated && accountId
			? `/api/accounts/${accountId}/transactions`
			: null
	);
};
