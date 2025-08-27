'use client';

import { Loader } from '@/components/ui/prompt-kit/loader';

export interface ChatThinkingMessageProps
	extends React.HTMLAttributes<HTMLDivElement> {
	isThinking?: boolean;
}
export const ChatThinkingMessage = ({
	isThinking,
}: ChatThinkingMessageProps) => {
	return (
		<div className='text-muted-foreground flex items-center gap-2 text-sm italic'>
			{isThinking && (
				<>
					<Loader
						size='md'
						variant='wave'
					/>
					Thinking...
				</>
			)}
		</div>
	);
};
