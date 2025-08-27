import useSWR from 'swr';
import { useUserProfile } from './use-user-profile';

const KEY = '/api/accounts';

export const useAccounts = () => {
	const { isAuthenticated } = useUserProfile();

	return useSWR<Accounts.Account[]>(isAuthenticated ? KEY : null);
};
