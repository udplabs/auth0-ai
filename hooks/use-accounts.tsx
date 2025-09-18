import type { SWRResponse } from 'swr';
import useSWR from 'swr';
import { useUserProfile } from './use-user-profile';

import type { Accounts } from '@/types/accounts';

const KEY = '/api/accounts';

type UseAccountsResponse = SWRResponse<Accounts.Account[]> & {
	resetPermissions: () => Promise<void>;
};

export const useAccounts = () => {
	const { isAuthenticated, isFetching, isLoading } = useUserProfile();

	const { mutate, ...swrRest } = useSWR<Accounts.Account[]>(
		!isLoading && !isFetching && isAuthenticated ? KEY : null
	);

	const resetPermissions = async () => {
		await fetch('/api/accounts/permissions', { method: 'DELETE' });
		await mutate();
	};

	return {
		mutate,
		resetPermissions,
		...swrRest,
	} as UseAccountsResponse;
};
