/**
 * Chat Page (Server Component)
 *
 * Dynamic route: /chat/[[...id]]
 *  - Optional catch‑all param `id`:
 *      * Absent  → create a brand new chat (ULID).
 *      * Present → load existing chat (and its persisted messages) if found.
 *
 * Responsibilities:
 *  1. Derive / normalize chat ID from route (first segment if array).
 *  2. Decide if this is a brand‑new chat (no id in URL) and generate one.
 *  3. Optionally resolve the current user (non‑throwing) to scope DB fetches.
 *  4. Load existing chat + messages (server‑side) when editing / continuing.
 *  5. Determine whether to trigger an initial content sync (cookie flag).
 *  6. Hydrate ChatProvider with initial state (from DB); render <Chat /> component.
 *
 * Auth Behavior:
 *  - Anonymous sessions allowed (getUser(false)); userId may be undefined.
 *  - When user not authenticated, chat persists ephemerally (unless later saved after login).
 *  - TODO: support saving ephemeral chat after authentication
 *
 * Persistence Notes:
 *  - Only loads messages if an id was supplied and chat exists.
 *  - Missing chat id in DB is treated as "start new"; no error surfaced to user. (upsert)
 *
 * Content Sync Flag:
 *  - Cookie 'db:sync' gates a first‑run content synchronization. If absent, syncContent=true is passed,
 *    letting the provider perform initial static content ingestion.
 *  - This is for lab purposes only -- we are using remote content for the 'learning platform'.
 *
 * Error Handling:
 *  - APIError of type 'not_found' → silently start a new chat.
 *  - Other errors logged server‑side (non-fatal for page rendering).
 *
 * Future Enhancements:
 *  - Add server redirect to canonical /chat/<id> after generating new ULID for cleaner URLs.
 *  - Preload user profile / settings in parallel (Promise.all) for latency reduction.
 *  - Add soft limit on initial message count (truncate very long histories).
 */

import { Chat, ChatProvider } from '@/components/features/chat';
import { getUser } from '@/lib/auth0';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Aiya Chat',
};

export default async function Page({
	params,
}: {
	params: Promise<{ id?: string | string[] }>;
}) {
	// Await dynamic route params (Next 13+ provides as a promise in server components).
	const { id: _pathId } = (await params) || {};

	let isNewChat = false;

	// Normalize route param: if catch‑all produced an array, take the first segment.
	let id = _pathId && Array.isArray(_pathId) ? _pathId[0] : _pathId;

	// No id supplied → generate a new ULID and mark as new chat session.
	if (!id) {
		const { ulid } = await import('ulid');

		id = ulid();
		isNewChat = true;

		const { redirect } = await import('next/navigation');

		redirect(`/chat/${id}`);
	}

	// Attempt to resolve user (non‑blocking / non‑throwing).
	const user = await getUser(false);

	if (!user?.sub) {
		console.log('no user session');
		console.log('initiating ephemeral chat...');
	}

	// Collector for preloaded messages (if existing chat found).
	const initialMessages: Chat.UIMessage[] = [];

	// If continuing an existing chat, fetch it (and its messages) from DB.
	if (!isNewChat) {
		try {
			const { getChatById } = await import('@/lib/db/queries/chat');

			const dbChats = await getChatById(id, {
				userId: user?.sub,
				includeMessages: true,
			});

			if (dbChats) {
				const { messages = [] } = dbChats;
				initialMessages.push(...messages);
			}
		} catch (error: unknown) {
			const { APIError } = await import('@/lib/errors');
			// Graceful degradation: not-found simply starts a fresh chat;
			// unexpected errors are logged.
			if (error instanceof APIError) {
				if (error.type === 'not_found') {
					console.log('starting new chat...');
				}
			} else {
				console.log('unexpected error loading chat:');
				console.log(error);
			}
		}
	}

	return (
		<ChatProvider
			{...{
				chatId: id,
				chatOptions: {
					...(initialMessages.length > 0 ? { messages: initialMessages } : {}),
				},
			}}
		>
			<Chat />
		</ChatProvider>
	);
}
