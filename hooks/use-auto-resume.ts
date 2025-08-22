'use client';

import type { UseChatHelpers } from '@ai-sdk/react';
import { useEffect } from 'react';

export interface UseAutoResumeParams {
	autoResume: boolean;
	initialMessages: Chat.UIMessage[];
	resumeStream: UseChatHelpers<Chat.UIMessage>['resumeStream'];
}

export function useAutoResume({
	autoResume,
	initialMessages,
	resumeStream,
}: UseAutoResumeParams) {
	useEffect(() => {
		if (!autoResume) return;

		const mostRecentMessage = initialMessages.at(-1);

		if (mostRecentMessage?.role === 'user') {
			resumeStream();
		}

		// we intentionally run this once
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
