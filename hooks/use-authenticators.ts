import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';

export function useAuthenticators() {
	const { user, isLoading: isAuthLoading } = useUser();

	return useSWR<Factor[]>(
		user?.sub || !isAuthLoading ? '/api/me/authenticators' : null
	);
}
