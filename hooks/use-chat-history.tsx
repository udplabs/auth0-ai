/**
 * useChatHistory
 *
 * Server‑backed (SWR) hook for loading and managing a user's chat history,
 * grouped into time buckets (today, yesterday, lastWeek, lastMonth, older).
 *
 * Features
 * - Conditional fetch (only after Auth0 user resolved).
 * - Fallback (empty buckets) to avoid undefined branching in UI.
 * - Optimistic deletion with Undo (timed toast & countdown button).
 * - Automatic redirect to a fresh chat if the currently open chat is deleted.
 *
 * Deletion Flow (deleteChat):
 *  1. Snapshot current grouped history.
 *  2. Optimistically remove the chat from all buckets (mutate w/out revalidate).
 *  3. If deleted chat is the active one, navigate to a new /chat/<ulid>.
 *  4. Show toast with countdown; user can Undo.
 *     - Undo: dismiss toast, restore snapshot (no server call).
 *     - Timeout / dismiss: perform actual DELETE fetch.
 *  5. On server error: rollback snapshot + show error toast (formatted JSON).
 *
 * Notes / Caveats
 * - DELETE request is only fired after countdown completes (or manual dismiss).
 * - An AbortController is created but not wired to an actual abort trigger (could add on Undo).
 * - count calculation subtracts 5 (bucket keys + maybe structural flatten). Consider revisiting.
 *
 * Potential Improvements
 * - Replace magic `- 5` in count with a clearer reducer over bucket arrays.
 * - Revalidate after successful DELETE to reconcile with server (if other tabs modify state).
 * - Add pagination if history grows large (current approach loads all).
 * - Integrate rate limiting or debounce for rapid deletes.
 * - Persist last viewed chat ID in user settings (so redirect after login restores context).
 */

import { CountDownButton } from '@/components/countdown-button';
import { toast } from '@/components/toast';
import { ToastError } from '@/components/toast-error';
import { APIError } from '@/lib/errors';
import { useUser } from '@auth0/nextjs-auth0';
import { useParams, useRouter } from 'next/navigation';
import { toast as sonnerToast } from 'sonner';
import type { SWRResponse } from 'swr';
import useSWR from 'swr';
import { ulid } from 'ulid';

const key = '/api/chat?grouped=true';

type UseChatHistoryResponse = SWRResponse<
	Chat.GroupedItems<Chat.UIChat>,
	any,
	{
		fallbackData: Chat.GroupedItems<Chat.UIChat>;
	}
> & {
	count: number;
	deleteChat: (chatId: string) => Promise<'undone' | 'deleted' | void>;
};

export function useChatHistory() {
	const router = useRouter();
	const { id } = useParams<{ id?: string }>();
	const { user, isLoading: isAuthLoading } = useUser();

	// Only start SWR once user.sub is known (avoid firing for anonymous pre-auth phase).
	const { data, isLoading, mutate, ...swrRest } = useSWR<
		Chat.GroupedItems<Chat.UIChat>,
		any,
		{ fallbackData: Chat.GroupedItems<Chat.UIChat> }
	>(user?.sub && !isAuthLoading ? key : null, {
		fallbackData: {
			today: [],
			yesterday: [],
			lastWeek: [],
			lastMonth: [],
			older: [],
		},
	});

	/**
	 * deleteChat
	 * Optimistically removes a chat and offers an Undo window.
	 */
	const deleteChat = (chatId: string) => {
		let toastId: string | number | undefined = undefined;
		const undoMs = 5 * 1000;

		if (!data || !key) return;
		const snapshot = data;

		// Restore original grouped data (no revalidate).
		const undo = () => {
			if (toastId) sonnerToast.dismiss(toastId);
			return mutate(snapshot, {
				revalidate: false,
				populateCache: true,
			});
		};

		// Reserved for future abort wiring (currently not used).
		const controller = new AbortController();

		// Finalize delete (server side) after countdown elapses or toast dismissed.
		const mutateFn = async () => {
			try {
				const res = await fetch(
					`${window.location.origin}/api/chat/${chatId}`,
					{ method: 'DELETE', signal: controller.signal }
				);

				if (!res.ok) {
					throw new APIError(
						'server_error:api',
						res.statusText || 'Failed to delete chat',
						await res.json()
					);
				}
				return;
			} catch (error: unknown) {
				// Roll back optimistic removal.
				await undo();
				const err =
					error instanceof APIError
						? error.toJSON()
						: new APIError(error).toJSON();

				if (toastId) {
					// Replace toast with structured error display.
					sonnerToast(
						<ToastError message='Oops! Something went wrong'>
							<pre>
								<code>{JSON.stringify(err, null, 2)}</code>
							</pre>
						</ToastError>,
						{
							id: toastId,
							duration: undoMs,
						}
					);
				} else {
					console.log(err);
				}
			}
		};

		// (1) Optimistic cache update: remove chat from all groups.
		mutate(removeFromGroups(snapshot, chatId), {
			revalidate: false,
			populateCache: true,
		});

		// (2) If deleting the currently open chat, navigate to a fresh session.
		if (chatId === id) {
			router.replace(`/chat/${ulid()}`);
		}

		// (3) Toast w/ Undo countdown.
		toastId = toast({
			title: 'Chat deleted!',
			duration: undoMs,
			type: 'success',
			onDismiss: mutateFn, // fires if user does not click Undo
			action: (
				<CountDownButton
					{...{
						duration: undoMs,
						onClick: () => undo(), // manual rollback
						onComplete: mutateFn, // auto-finalize
						label: 'Undo',
					}}
				/>
			),
		});
	};

	return {
		data,
		isLoading,
		deleteChat,
		mutate,
		// count: total chats (current implementation subtracts 5—likely to offset keys; refine if misleading)
		count: Object.entries(data).flat().flat().length - 5,
		...swrRest,
	} as UseChatHistoryResponse;
}

/**
 * removeFromGroups
 * Utility: remove a chat id from all time buckets immutably.
 */
function removeFromGroups(
	groups: Chat.GroupedItems<Chat.UIChat>,
	id: string
): Chat.GroupedItems<Chat.UIChat> {
	const out = (list: Chat.UIChat[]) => list.filter((c) => c.id !== id);
	return {
		today: out(groups.today),
		yesterday: out(groups.yesterday),
		lastWeek: out(groups.lastWeek),
		lastMonth: out(groups.lastMonth),
		older: out(groups.older),
	};
}
