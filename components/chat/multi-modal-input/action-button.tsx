import { Button } from '@/components/ui/button';
import { ArrowUpIcon, Square as StopIcon } from 'lucide-react';

import type { UseChatHelpers } from '@ai-sdk/react';

export function ActionButton({
	submitForm,
	input,
	onStop,
	setMessages,
}: {
	submitForm?: () => void;
	input?: string;
	onStop?: () => void;
	setMessages?: UseChatHelpers<Chat.UIMessage>['setMessages'];
}) {
	const isStop = !!onStop;

	return (
		<Button
			data-testid={`${isStop ? 'stop' : 'send'}-button`}
			className='h-fit rounded-full border p-1.5 dark:border-zinc-600'
			onClick={(event) => {
				event.preventDefault();
				if (isStop && onStop && setMessages) {
					onStop();
					setMessages((messages) => messages);
				} else if (submitForm) {
					submitForm();
				}
			}}
			disabled={!isStop && input?.length === 0}
		>
			{isStop ? <StopIcon size={14} /> : <ArrowUpIcon size={14} />}
		</Button>
	);
}
