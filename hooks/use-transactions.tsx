import useSWR from 'swr';
import { useUserProfile } from './use-user-profile';

export const useTransactions = (accountId?: string) => {
	const { isAuthenticated } = useUserProfile();

	return useSWR<Accounts.Transaction[]>(
		isAuthenticated && accountId
			? `/api/accounts/${accountId}/transactions`
			: null
	);
};
