import { CountDownButton } from '@/components/countdown-button';
import { toast } from '@/components/toast';
// import { ToastError } from '@/components/toast-error';
import { APIError } from '@/lib/errors';
import { useUser } from '@auth0/nextjs-auth0';
import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
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

	const deleteChat = useCallback(
		(chatId: string) => {
			let toastId: string | number | undefined = undefined;

			const undoMs = 5 * 1000;

			if (!data || !key) return;
			const snapshot = data;

			const undo = () => {
				if (toastId) {
					sonnerToast.dismiss(toastId);
				}

				return mutate(snapshot, {
					revalidate: false,
					populateCache: true,
				});
			};

			const controller = new AbortController();

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
					await undo();

					const err =
						error instanceof APIError
							? error.toJSON()
							: new APIError(error).toJSON();

					if (toastId) {
						// toast(
						// 	<ToastError message='Oops! Something went wrong'>
						// 		<pre>
						// 			<code>{JSON.stringify(err, null, 2)}</code>
						// 		</pre>
						// 	</ToastError>,
						// 	{
						// 		id: toastId,
						// 		duration: undoMs,
						// 	}
						// );
					} else {
						console.log(err);
					}
				}
			};

			// 1) Optimistically cache update
			mutate(removeFromGroups(snapshot, chatId), {
				revalidate: false,
				populateCache: true,
			});

			// 2) Redirect to a new chat (if necessary)
			if (chatId === id) {
				router.replace(`/chat/${ulid()}`);
			}

			// 3) Present toast
			toastId = toast({
				title: 'Chat deleted!',
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
		[mutate, data, key, toast, sonnerToast]
	);

	return {
		data,
		isLoading,
		deleteChat,
		mutate,
		count: Object.entries(data).flat().flat().length - 5,
		...swrRest,
	} as UseChatHistoryResponse;
}

// remove a chat id from all buckets
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
