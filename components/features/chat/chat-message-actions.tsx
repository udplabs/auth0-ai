import {
	Action,
	Actions,
	type ActionProps,
	type ActionsProps,
} from '@/components/ui/ai-elements/actions';
import { cn } from '@/lib/utils';
import equal from 'fast-deep-equal';
import { CopyIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { memo } from 'react';
import { toast } from 'sonner';
import { useCopyToClipboard } from 'usehooks-ts';

import type { Chat } from '@/types/chat';

export interface ChatMessageActionsProps extends ActionsProps {
	ActionProps?: ActionProps;
	isLastMessage?: boolean;
	isLoading?: boolean;
	message: Chat.UIMessage;
}

export function PureChatMessageActions({
	message,
	isLastMessage = false,
	isLoading,
	ActionProps,
	className,
	...props
}: ChatMessageActionsProps) {
	const [_, copyToClipboard] = useCopyToClipboard();
	const { isUpVoted, isDownVoted } = message.metadata || {};

	if (isLoading || message.role === 'user' || !isLastMessage) return null;

	return (
		<Actions
			{...{
				...props,
				className: cn('ms-4 max-w-[80%]', className),
			}}
		>
			<Action
				{...{
					...ActionProps,
					className: cn(
						'text-muted-foreground h-fit px-2 py-1',
						ActionProps?.className
					),
					tooltip: 'Copy',
					variant: 'outline',
					onClick: async () => {
						const textFromParts = message.parts
							?.filter((part) => part.type === 'text')
							.map((part) => part.text)
							.join('\n')
							.trim();

						if (!textFromParts) {
							toast.error("There's no text to copy!");
							return;
						}

						await copyToClipboard(textFromParts);
						toast.success('Copied to clipboard!');
					},
				}}
			>
				<CopyIcon />
			</Action>
			<Action
				{...{
					...ActionProps,
					disabled: isUpVoted,
					className: cn(
						'text-muted-foreground !pointer-events-auto h-fit px-2 py-1',
						ActionProps?.className
					),
					tooltip: 'Loved it!',
					'data-testid': 'message-upvote',
					variant: 'outline',
					onClick: async () => {
						const upvote = fetch(`/api/messages/${message.id}/votes`, {
							method: 'PATCH',
							body: JSON.stringify({
								vote: 'up',
							}),
						});

						toast.promise(upvote, {
							loading: 'Upvoting...',
							success: () => {
								return 'Thank you! Your feedback helps us improve.';
							},
							error: 'Failed to upvote response.',
						});
					},
				}}
			>
				<ThumbsUpIcon />
			</Action>
			<Action
				{...{
					...ActionProps,
					disabled: isDownVoted,
					className: cn(
						'text-muted-foreground !pointer-events-auto h-fit px-2 py-1',
						ActionProps?.className
					),
					tooltip: 'Hated it!',
					'data-testid': 'message-downvote',
					variant: 'outline',
					onClick: async () => {
						const downvote = fetch(`/api/messages/${message.id}/votes`, {
							method: 'PATCH',
							body: JSON.stringify({
								vote: 'down',
							}),
						});

						toast.promise(downvote, {
							loading: 'Downvoting...',
							success: () => {
								return 'Thank you! Your feedback helps us improve.';
							},
							error: 'Failed to downvote response.',
						});
					},
				}}
			>
				<ThumbsDownIcon />
			</Action>
		</Actions>
	);
}

export const ChatMessageActions = memo(
	PureChatMessageActions,
	(prevProps, nextProps) => {
		if (!equal(prevProps.message, nextProps.message)) return false;
		if (prevProps.isLoading !== nextProps.isLoading) return false;

		return true;
	}
);
