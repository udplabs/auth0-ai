import type { SWRResponse } from 'swr';
import useSWR from 'swr';
import { useUserProfile } from './use-user-profile';

const KEY = '/api/accounts';

type UseAccountsResponse = SWRResponse<Accounts.Account[]> & {
	resetPermissions: () => Promise<void>;
};

export const useAccounts = () => {
	const { isAuthenticated } = useUserProfile();

	const { mutate, ...swrRest } = useSWR<Accounts.Account[]>(
		isAuthenticated ? KEY : null
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
