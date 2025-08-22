import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ulid } from 'ulid';

import { Chat, type ChatProps } from '@/components/chat/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { getUser } from '@/lib/auth0/client';
import { getChatById } from '@/lib/db//queries/chat';
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
		console.log('no user session, redirecting to login...');
		redirect('/auth/login');
	}

	const cookieStore = await cookies();
	const chatModelFromCookie = cookieStore.get('chat-model');

	const chatProps: ChatProps = {
		id,
		userId: user.sub,
		initialMessages: [],
		initialChatModel: chatModelFromCookie?.value || DEFAULT_CHAT_MODEL,
		autoResume: true,
	};

	if (!isNewChat) {
		try {
			const dbChats = await getChatById(id, user.sub, true);

			if (dbChats) {
				const { messages = [] } = dbChats;

				chatProps.initialMessages = messages;
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

	return <Chat {...chatProps} />;
}
