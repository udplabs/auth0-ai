'use client';

import { CountDownButton } from '@/components/countdown-button';
import { toast } from '@/components/toast';
import { APIError } from '@/lib/errors';
import { useUser } from '@auth0/nextjs-auth0';
import { useCallback } from 'react';
import { toast as sonnerToast } from 'sonner';
import useSWR from 'swr';

const key = '/api/me/authenticators';

export function useAuthenticators() {
	const { user, isLoading: isAuthLoading } = useUser();

	const {
		data = [],
		isLoading,
		mutate,
		...swrRest
	} = useSWR<Factor[]>(user?.sub || !isAuthLoading ? key : null);

	const deleteAuthenticator = useCallback(
		(authenticatorId: string) => {
			let toastId: string | number | undefined = undefined;

			const undoMs = 5 * 1000;

			if (!data || !key) return;
			const snapshot = data;

			const undo = () => {
				if (toastId) {
					sonnerToast.dismiss(toastId);
				}

				return mutate(snapshot, { revalidate: false, populateCache: true });
			};

			const controller = new AbortController();

			const mutateFn = async () => {
				try {
					const res = await fetch(
						`${window.location.origin}/api/me/authenticators/${authenticatorId}`,
						{ method: 'DELETE', signal: controller.signal }
					);

					if (!res.ok) {
						throw new APIError(
							'server_error:api',
							res.statusText || 'Failed to delete authenticator',
							await res.json()
						);
					}

					return;
				} catch (error: unknown) {
					await undo();

					const err =
						error instanceof APIError
							? error.toJSON()
							: new APIError(error).toJSON();

					if (toastId) {
						// update toast --
						toast({
							data: JSON.stringify(err),
							title: 'Something went wrong!',
							description:
								'Unable to delete (or undo deletion of) your authenticator',
							type: 'error',
						});
					} else {
						console.log(err);
					}
				}
			};

			// 1) Optimistically cache update
			mutate(
				snapshot.filter((s) => s.id !== authenticatorId),
				{ revalidate: false, populateCache: true }
			);

			// 2) Present toast!
			toastId = toast({
				title: 'Authenticator deleted!',
				duration: undoMs,
				type: 'success',
				onDismiss: mutateFn,
				action: (
					<CountDownButton
						{...{
							duration: undoMs,
							onClick: () => undo(),
							onComplete: mutateFn,
							label: 'Undo',
						}}
					/>
				),
			});
		},
		[mutate, data]
	);

	return {
		data,
		isLoading,
		deleteAuthenticator,
		mutate,
		count: data?.length,
		swrRest,
	};
}
