'use client';

import { Loader, LoaderProps } from '@/components/ui/prompt-kit/loader';
import { cn } from '@/lib/utils';
export interface ChatThinkingMessageProps
	extends React.HTMLAttributes<HTMLDivElement> {
	isThinking?: boolean;
	LoaderProps?: LoaderProps;
}
export const ChatThinkingMessage = ({
	isThinking,
	className,
	LoaderProps,
	...props
}: ChatThinkingMessageProps) => {
	if (!isThinking) return null;
	return (
		<div
			className={cn(
				'text-muted-foreground flex items-center gap-2 text-sm italic',
				className
			)}
			{...props}
		>
			{isThinking && (
				<Loader {...{ size: 'md', variant: 'wave', ...LoaderProps }} />
			)}
			{isThinking && 'Thinking...'}
		</div>
	);
};
