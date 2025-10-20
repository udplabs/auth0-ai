import { toast } from '@/components/toast';
import { APIError } from '@/lib/errors';
import { useUser } from '@auth0/nextjs-auth0';
import type { GetUsers200ResponseOneOfInner, UserUpdate } from 'auth0';
import { useCallback } from 'react';
import { toast as sonnerToast } from 'sonner';
import type { Key, SWRConfiguration, SWRResponse } from 'swr';
import useSWR from 'swr';

import type { UICreateSettingsInput, UISettings } from '@/types/settings';

const KEY = '/api/me';

export interface UserProfile extends GetUsers200ResponseOneOfInner {
	displayName?: string;
	custom_metadata?: Partial<Omit<UISettings, 'createdAt' | 'updatedAt' | 'id'>>;
}

interface UserProfileSWROptions extends SWRConfiguration {
	fallbackData: UserProfile;
	// onSuccess: (data: UserProfile, key: string) => Promise<void>;
}

type UseUserProfileResponse = SWRResponse<
	UserProfile,
	any,
	UserProfileSWROptions
> & {
	isAuthenticated?: boolean;
	updateUser: (data: UserUpdate) => Promise<'undone' | 'success' | void>;
	updateUserSettings: (data: UICreateSettingsInput) => Promise<void>;
	/**
	 * Whether the user profile is currently being fetched.
	 * This is derived from the SWR `isLoading`.
	 */
	isFetching: boolean;
	/**
	 * Whether the Auth0 user info is currently loaded.
	 * This is derived from the Auth0 useUser() `isLoading`.
	 */
	isLoading: boolean;
};

export const useUserProfile = () => {
	const { user, isLoading, error: useUserError } = useUser();

	const { sub: user_id, ...claims } = user || {};

	const isAuthenticated = !!user_id && !isLoading;

	const {
		data,
		isLoading: isFetching,
		mutate,
		error: swrError,
		...swrRest
	} = useSWR<UserProfile, any, Key, UserProfileSWROptions>(
		isAuthenticated ? KEY : null,
		{
			fallbackData: {
				user_id,
				...claims,
			} as UserProfile,
			// onSuccess,
		}
	);

	const displayName = data?.nickname || data?.name;

	const updateUserSettings = useCallback(
		async (settingsUpdate: UICreateSettingsInput) => {
			if (!data || !KEY) return;

			try {
				const res = await fetch(`${KEY}/settings`, {
					method: 'PATCH',
					body: JSON.stringify(settingsUpdate),
				});

				if (!res.ok) {
					throw new APIError(
						'server_error:api',
						res.statusText || 'Failed to update user settings',
						await res.json()
					);
				}

				mutate();

				return;
			} catch (error: unknown) {
				const err =
					error instanceof APIError
						? error.toJSON()
						: new APIError(error).toJSON();

				console.error(err);
			}
		},
		[mutate, data]
	);

	const updateUserProfile = useCallback(
		async (updateData: UserUpdate) => {
			if (!data || !KEY) return;

			const toastId: string | number | undefined = undefined;

			try {
				const updated = await mutate(
					async () => {
						const res = await fetch(KEY, {
							method: 'PATCH',
							signal: new AbortController().signal,
							body: JSON.stringify(updateData),
						});

						if (!res.ok) {
							throw new APIError(
								'server_error:api',
								res.statusText || 'Failed to update user profile',
								await res.json()
							);
						}

						return (await res.json()) as UserProfile;
					},
					{
						optimisticData: (current) => {
							return {
								...current,
								app_metadata: {
									...current?.app_metadata,
									...updateData?.app_metadata,
								},
								user_metadata: {
									...current?.user_metadata,
									...updateData?.user_metadata,
								},
							} as UserProfile;
						},
						rollbackOnError: true,
						populateCache: true,
						revalidate: false, // we already returned server data
					}
				);

				sonnerToast.dismiss(toastId);
				sonnerToast.success('Profile updated!');

				return updated;
			} catch (error: unknown) {
				const err =
					error instanceof APIError
						? error.toJSON()
						: new APIError(error).toJSON();

				if (toastId) {
					toast({
						data: JSON.stringify(err),
						title: 'Something went wrong!',
						description: 'Unable to undo user profile update. Sorry!',
						type: 'error',
					});
				} else {
					console.error(err);
				}
				return undefined;
			}
		},
		[mutate, data]
	);

	// async function onSuccess(data: UserProfile) {
	// 	const { user_id, app_metadata } = data || {};

	// 	const { has_accounts = 'false' } = app_metadata || {};

	// 	// Check if this is the user's first login
	// 	if (user_id && (!has_accounts || has_accounts == 'false')) {
	// 		// Initialize fake account data!
	// 		console.log('useUserProfile: creating mock accounts for user:', user_id);
	// 		await createMockAccountsAction(user_id);

	// 		// Update the user profile to indicate accounts have been created
	// 		await updateUserProfile({
	// 			app_metadata: { has_accounts: true },
	// 		});
	// 	}
	// }

	return {
		data: {
			...data,
			displayName,
		},
		error: useUserError || swrError,
		isLoading, // from Auth0 useUser()
		isFetching, // isLoading from SWR
		isAuthenticated,
		mutate,
		updateUser: updateUserProfile,
		updateUserSettings,
		...swrRest,
	} as UseUserProfileResponse;
};
