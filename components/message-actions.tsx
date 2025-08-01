import { useCopyToClipboard } from 'usehooks-ts';

import { CopyIcon, ThumbDownIcon, ThumbUpIcon } from './icons';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { memo } from 'react';
import equal from 'fast-deep-equal';
import { toast } from 'sonner';

export function PureMessageActions({
  message,
  isLoading,
}: {
  message: ChatMessage;
  isLoading: boolean;
}) {
  const [_, copyToClipboard] = useCopyToClipboard();
  const { isUpvoted, isDownvoted } = message.metadata || {};

  if (isLoading) return null;
  if (message.role === 'user') return null;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-row gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="py-1 px-2 h-fit text-muted-foreground"
              variant="outline"
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
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              data-testid="message-upvote"
              className="py-1 px-2 h-fit text-muted-foreground pointer-events-auto!"
              disabled={isUpvoted}
              variant="outline"
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
                    return 'Upvoted!';
                  },
                  error: 'Failed to upvote response.',
                });
              }}
            >
              <ThumbUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Upvote Response</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              data-testid="message-downvote"
              className="py-1 px-2 h-fit text-muted-foreground pointer-events-auto!"
              variant="outline"
              disabled={isDownvoted}
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
                    return 'Downvoted!';
                  },
                  error: 'Failed to downvote response.',
                });
              }}
            >
              <ThumbDownIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Downvote Response</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export const MessageActions = memo(
  PureMessageActions,
  (prevProps, nextProps) => {
    if (!equal(prevProps.message, nextProps.message)) return false;
    if (prevProps.isLoading !== nextProps.isLoading) return false;

    return true;
  },
);
