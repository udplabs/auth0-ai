import { Action, Actions } from '@/components/ui/message-action';
import equal from 'fast-deep-equal';
import { CopyIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { memo } from 'react';
import { toast } from 'sonner';
import { useCopyToClipboard } from 'usehooks-ts';

export function PureMessageActions({
	message,
	isLoading,
}: {
	message: Chat.UIMessage;
	isLoading: boolean;
}) {
	const [_, copyToClipboard] = useCopyToClipboard();
	const { isUpVoted, isDownVoted } = message.metadata || {};

	if (isLoading) return null;
	if (message.role === 'user') return null;

	return (
		<Actions>
			<Action
				tooltip='Copy'
				className='text-muted-foreground h-fit px-2 py-1'
				variant='outline'
				onClick={async () => {
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
				}}
			>
				<CopyIcon />
			</Action>
			<Action
				tooltip='Loved it'
				data-testid='message-upvote'
				className='text-muted-foreground !pointer-events-auto h-fit px-2 py-1'
				disabled={isUpVoted}
				variant='outline'
				onClick={async () => {
					const upvote = fetch(`/api/messages/${message.id}/votes`, {
						method: 'PATCH',
						body: JSON.stringify({
							vote: 'UP',
						}),
					});

					toast.promise(upvote, {
						loading: 'Upvoting...',
						success: () => {
							return 'Thank you! Your feedback helps us improve.';
						},
						error: 'Failed to upvote response.',
					});
				}}
			>
				<ThumbsUpIcon />
			</Action>
			<Action
				tooltip='Hated it'
				data-testid='message-downvote'
				className='text-muted-foreground !pointer-events-auto h-fit px-2 py-1'
				variant='outline'
				disabled={isDownVoted}
				onClick={async () => {
					const downvote = fetch(`/api/messages/${message.id}/votes`, {
						method: 'PATCH',
						body: JSON.stringify({
							vote: 'DOWN',
						}),
					});

					toast.promise(downvote, {
						loading: 'Downvoting...',
						success: () => {
							return 'Thank you! Your feedback helps us improve.';
						},
						error: 'Failed to downvote response.',
					});
				}}
			>
				<ThumbsDownIcon />
			</Action>
		</Actions>
	);
}

export const MessageActions = memo(
	PureMessageActions,
	(prevProps, nextProps) => {
		if (!equal(prevProps.message, nextProps.message)) return false;
		if (prevProps.isLoading !== nextProps.isLoading) return false;

		return true;
	}
);
