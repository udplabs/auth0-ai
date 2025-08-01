import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';

import { auth0 } from '@/lib/auth0';
import { Chat } from '@/components/chat';
import { getChatById } from '@/lib/db';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const session = await auth0.getSession();
  const { user } = session || {};

  if (!user?.sub) {
    redirect('/auth/login');
  }

  const {
    messages = [],
    visibility = 'public',
    ...chat
  } = await getChatById(id, user.sub, true);

  if (!chat) {
    notFound();
  }

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get('chat-model');

  if (!chatModelFromCookie) {
    return (
      <>
        <Chat
          id={chat.id}
          initialMessages={messages}
          initialChatModel={DEFAULT_CHAT_MODEL}
          initialVisibilityType={visibility}
          isReadonly={user?.sub !== chat.userId}
          autoResume={true}
        />
        <DataStreamHandler />
      </>
    );
  }

  return (
    <>
      <Chat
        id={chat.id}
        initialMessages={messages}
        initialChatModel={chatModelFromCookie.value}
        initialVisibilityType={visibility}
        isReadonly={session?.user?.id !== chat.userId}
        autoResume={true}
      />
      <DataStreamHandler />
    </>
  );
}
