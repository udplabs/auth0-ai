import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';

export const useUserProfile = () => {
	const { user, isLoading: isAuthLoading } = useUser();

	return useSWR(user?.sub || !isAuthLoading ? '/api/me' : null);
};
