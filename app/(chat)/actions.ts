'use server';

import { generateText, type UIMessage } from 'ai';
import { cookies } from 'next/headers';
import { after } from 'next/server';
import { deleteMessagesByChatId } from '@/lib/db';
import { myProvider } from '@/lib/ai/providers';
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from 'resumable-stream';

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set('chat-model', model);
}

export async function getStreamContext(
  streamContext: ResumableStreamContext | null,
) {
  if (!streamContext) {
    try {
      return createResumableStreamContext({
        waitUntil: after,
      });
    } catch (error: any) {
      if (error.message.includes('REDIS_URL')) {
        console.log(
          ' > Resumable streams are disabled due to missing REDIS_URL',
        );
      } else {
        console.error(error);
      }
    }
  }

  return streamContext;
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: UIMessage;
}) {
  const { text: title } = await generateText({
    model: myProvider.languageModel('title-model'),
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

export async function deleteTrailingMessages(chatId: string) {
  await deleteMessagesByChatId(chatId);
}
