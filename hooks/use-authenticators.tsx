'use client';

import { CountDownButton } from '@/components/countdown-button';
import { toast } from '@/components/toast';
import { APIError } from '@/lib/errors';
import { useUser } from '@auth0/nextjs-auth0';
import { useCallback } from 'react';
import { toast as sonnerToast } from 'sonner';
import useSWR from 'swr';

const key = '/api/me/authenticators';

/**
 * useAuthenticators
 *
 * Hook responsibilities:
 * 1. Conditionally fetch the current user's enrolled authentication factors (MFA authenticators) via SWR.
 * 2. Provide an optimistic deletion UX with a timed UNDO:
 *    - Immediately removes the authenticator from the local cache.
 *    - Shows a toast with a countdown-driven Undo button.
 *    - If not undone within N seconds, executes the DELETE request.
 *    - If the DELETE fails (or Undo chosen), restores the original cache snapshot.
 *
 * Data Flow:
 * - SWR key is only activated once we know (a) user.sub OR (b) auth loading finished (prevents premature call).
 * - deleteAuthenticator(authenticatorId):
 *    a) Take snapshot of current list.
 *    b) Optimistically filter it out (mutate(..., revalidate:false)).
 *    c) Spawn toast with CountDownButton (Undo).
 *    d) On dismiss / countdown completion → perform actual DELETE.
 *    e) On failure → revert snapshot + surface error toast.
 *
 * Error Handling:
 * - Network / server errors are wrapped in APIError for consistent JSON shape.
 * - Undo path cancels the pending destructive effect by restoring snapshot (no revalidate).
 *
 * UX Notes:
 * - Countdown button both displays remaining time and triggers finalization when it completes.
 * - Undo dismisses the toast and short-circuits the DELETE request (since fetch is only fired at onDismiss/onComplete).
 *
 * Potential Improvements:
 * - Add AbortController usage to actually abort an in-flight DELETE if Undo clicked after it started (currently controller defined but not tied to an abort action on undo).
 * - Debounce rapid successive deletions.
 * - Revalidate after successful DELETE to ensure server truth (small risk of drift if other tabs modify factors).
 * - Track pending deletes to disable duplicate clicks.
 */
export function useAuthenticators() {
	const { user, isLoading: isAuthLoading } = useUser();

	// SWR fetch: only run once we know user id or auth has definitively finished.
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
			const snapshot = data; // Keep original list for rollback.

			const undo = () => {
				if (toastId) {
					sonnerToast.dismiss(toastId);
				}
				// Restore snapshot without revalidation (instant rollback).
				return mutate(snapshot, { revalidate: false, populateCache: true });
			};

			const controller = new AbortController(); // (Could be used to abort fetch if undo after start.)

			// Finalize: perform actual DELETE on server.
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
					// Rollback optimistic removal.
					await undo();

					const err =
						error instanceof APIError
							? error.toJSON()
							: new APIError(error).toJSON();

					if (toastId) {
						// Update / replace toast with error info.
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

			// (1) Optimistic cache update: remove authenticator locally.
			mutate(
				snapshot.filter((s) => s.id !== authenticatorId),
				{ revalidate: false, populateCache: true }
			);

			// (2) Toast with Undo countdown. onDismiss triggers when timeout elapses (no manual undo).
			toastId = toast({
				title: 'Authenticator deleted!',
				duration: undoMs,
				type: 'success',
				onDismiss: mutateFn, // Called if user does NOT click Undo.
				action: (
					<CountDownButton
						{...{
							duration: undoMs,
							onClick: () => undo(), // Manual undo before timeout.
							onComplete: mutateFn, // Auto-fire delete when countdown finishes.
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
		swrRest, // expose remaining SWR
	};
}
