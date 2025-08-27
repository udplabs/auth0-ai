'use client';

import type { UIMessage, UseChatHelpers } from '@ai-sdk/react';
import { useEffect } from 'react';

export interface UseAutoResumeParams<
	UI_MESSAGE extends UIMessage = Chat.UIMessage,
> {
	autoResume: boolean;
	initialMessages?: UI_MESSAGE[];
	resumeStream: UseChatHelpers<UI_MESSAGE>['resumeStream'];
}

export function useAutoResume<UI_MESSAGE extends UIMessage = Chat.UIMessage>({
	autoResume,
	initialMessages = [],
	resumeStream,
}: UseAutoResumeParams<UI_MESSAGE>) {
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
