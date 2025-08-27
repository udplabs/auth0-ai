import { redirect } from 'next/navigation';
import { ulid } from 'ulid';

import { Chat, ChatProvider } from '@/components/features/chat';
import { getUser } from '@/lib/auth0';
import { getChatById } from '@/lib/db/queries/chat';
import { APIError } from '@/lib/errors';

export default async function Page({
	params,
}: {
	params: Promise<{ id?: string | string[] }>;
}) {
	const { id: _pathId } = (await params) || {};

	let isNewChat = false;

	let id = _pathId && Array.isArray(_pathId) ? _pathId[0] : _pathId;

	if (!id) {
		id = ulid();
		isNewChat = true;
	}

	const user = await getUser(false);

	if (!user?.sub) {
		console.log('no user session');
		console.log('initiating ephemeral chat...');
	}

	const initialMessages: Chat.UIMessage[] = [];

	if (!isNewChat) {
		try {
			const dbChats = await getChatById(id, {
				userId: user?.sub,
				includeMessages: true,
			});

			if (dbChats) {
				const { messages = [] } = dbChats;

				initialMessages.push(...messages);
			}
		} catch (error: unknown) {
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
