'use client';

import { useMemo } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { unstable_serialize } from 'swr/infinite';
import { updateChatVisibilityById } from '@/lib/db';
import {
  getChatHistoryPaginationKey,
  type ChatHistory,
} from '@/components/app-sidebar/sidebar-history';
import { useUser } from '@auth0/nextjs-auth0';

export function useChatVisibility({
  chatId,
  initialVisibilityType,
}: {
  chatId: string;
  initialVisibilityType: 'public' | 'private';
}) {
  const { user } = useUser();
  const { mutate, cache } = useSWRConfig();
  const history: ChatHistory = cache.get('/api/history')?.data;

  const { data: localVisibility, mutate: setLocalVisibility } = useSWR(
    `${chatId}-visibility`,
    null,
    {
      fallbackData: initialVisibilityType,
    },
  );

  const visibilityType = useMemo<'public' | 'private'>(() => {
    if (!history) return localVisibility;
    const chat = history.chats.find((chat) => chat.id === chatId);
    if (!chat) return 'private';
    return chat.visibility;
  }, [history, chatId, localVisibility]);

  const setVisibilityType = (updatedVisibilityType: 'public' | 'private') => {
    setLocalVisibility(updatedVisibilityType);
    mutate(unstable_serialize(getChatHistoryPaginationKey));

    user?.sub &&
      updateChatVisibilityById(chatId, user.sub, updatedVisibilityType);
  };

  return { visibilityType, setVisibilityType };
}
