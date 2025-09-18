import useSWR from 'swr';
import { useUserProfile } from './use-user-profile';

import type { Transactions } from '@/types/transactions';

export const useTransactions = (accountId?: string) => {
	const { isAuthenticated, isFetching, isLoading } = useUserProfile();

	return useSWR<Transactions.Transaction[]>(
		!isLoading && !isFetching && isAuthenticated && accountId
			? `/api/accounts/${accountId}/transactions`
			: null
	);
};
