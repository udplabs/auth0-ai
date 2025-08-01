import { cookies } from 'next/headers';
import Script from 'next/script';
import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { ulid } from 'ulid';
import { DataStreamHandler } from '@/components/data-stream-handler';
// import { auth0 } from '@/lib/auth0/';
// import { redirect } from 'next/navigation';

export default async function Page() {
  // const session = await auth0.getSession();

  // if (!session) {
  //   redirect('/api/auth/guest');
  // }

  const id = ulid();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialChatModel={modelIdFromCookie?.value || DEFAULT_CHAT_MODEL}
        initialVisibilityType="public"
        isReadonly={false}
        autoResume={false}
      />
      <DataStreamHandler />
    </>
  );
}
