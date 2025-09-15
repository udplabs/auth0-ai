import { toast } from '@/components/toast';
import { ToastError } from '@/components/toast-error';
import { useSidebar } from '@/components/ui/sidebar';
import { APIError } from '@/lib/errors';
import { useUser } from '@auth0/nextjs-auth0';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast as sonnerToast } from 'sonner';
import type { SWRResponse } from 'swr';
import useSWR from 'swr';
import { ulid } from 'ulid';

import type { Chat } from '@/types/chat';
import { isEqual } from 'date-fns';
/**
 * useChatHistory
 *
 * Server‑backed (SWR) hook for loading and managing a user's chat history,
 * grouped into time buckets (today, yesterday, lastWeek, lastMonth, older).
 *
 * Features
 * - Conditional fetch (only after Auth0 user resolved).
 * - Fallback (empty buckets) to avoid undefined branching in UI.
 * - Delete chat
 * - Automatic redirect to a fresh chat if the currently open chat is deleted.
 *
 * Deletion Flow (deleteChat):
 *  1. Delete chat
 *  2. If deleted chat is the active one, navigate to a new /chat/<ulid>.
 *  3. Show toast
 *
 * - Add pagination if history grows large (current approach loads all).
 * - Integrate rate limiting or debounce for rapid deletes.
 * - Persist last viewed chat ID in user settings (so redirect after login restores context).
 */

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
	newChat: (id?: string) => void;
};

export function useChatHistory() {
	const router = useRouter();
	const { setOpenMobile } = useSidebar();
	const { id } = useParams<{ id?: string }>();
	const { user, isLoading: isAuthLoading } = useUser();

	const pathId = Array.isArray(id) ? id[0] : id;
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

	const [loading, setLoading] = useState(false);

	const newChat = (redirect = true) => {
		setOpenMobile(false);

		const createdAt = new Date().toISOString();

		const newChat: Chat.UIChat = {
			id: pathId,
			title: 'New Chat',
			createdAt,
			updatedAt: createdAt,
		};

		mutate(
			(current) => {
				if (!current) {
					return {
						today: [newChat],
						yesterday: [],
						lastWeek: [],
						lastMonth: [],
						older: [],
					};
				}
				return {
					...current,
					today: arrayUpsert(current.today, newChat, 'id'),
				};
			},
			{ revalidate: false, populateCache: true }
		);

		if (redirect) {
			console.log('redirecting...');
			router.push('/chat');
		}
	};

	/**
	 * deleteChat
	 * Optimistically removes a chat and offers an Undo window.
	 */
	const deleteChat = async (chatId: string) => {
		let toastId: string | number | undefined = undefined;
		const snapshot = data;

		if (!data || !key) return;

		setLoading(true);

		// (1) Optimistic cache update: remove chat from all groups.
		mutate(removeFromGroups(snapshot, chatId), {
			revalidate: false,
			populateCache: true,
		});

		// (2) If deleting the currently open chat, navigate to a fresh session.
		if (chatId === pathId) {
			console.log('Navigating to new chat...');
			newChat();
		}

		try {
			const res = await fetch(`${window.location.origin}/api/chat/${chatId}`, {
				method: 'DELETE',
			});

			if (!res.ok) {
				throw new APIError(
					'server_error:api',
					res.statusText || 'Failed to delete chat',
					await res.json()
				);
			}
			return;
		} catch (error: unknown) {
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
					}
				);
			} else {
				console.log(err);
			}
			setLoading(false);
		}

		// (3) Toast 🥂.
		toastId = toast({
			title: 'Chat deleted!',
			type: 'success',
		});
	};

	return {
		data,
		isLoading: isLoading || loading,
		deleteChat,
		newChat,
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

function arrayUpsert<T>(
	array: T[],
	item: T,
	isEqual: string | ((a: T, b: T) => boolean),
	prepend = true
): T[] {
	const checker =
		typeof isEqual === 'function'
			? isEqual
			: (a: T, b: T) => (a as any)[isEqual] === (b as any)[isEqual];
	const index = array.findIndex((i) => checker(i, item));
	if (index !== -1) {
		// replace in position
		const copy = array.slice();
		copy[index] = item;
		return copy;
	}
	return prepend ? [item, ...array] : [...array, item];
}
