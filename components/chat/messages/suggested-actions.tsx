'use client';

import { Button } from '@/components/ui/button';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	type CollapsibleProps,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import type { UseChatHelpers } from '@ai-sdk/react';
import { motion } from 'framer-motion';
import { ChevronUpIcon as ArrowIcon } from 'lucide-react';

interface SuggestedActionsProps {
	chatId: string;
	sendMessage: UseChatHelpers<Chat.UIMessage>['sendMessage'];
	open?: boolean;
	onOpenChange?: CollapsibleProps['onOpenChange'];
}

export function SuggestedActions({
	chatId,
	open = true,
	onOpenChange,
	sendMessage,
}: SuggestedActionsProps) {
	const suggestedActions = [
		{
			title: 'What is FGA for RAG?',
			action: `Explain 'rag''`,
		},
		{
			title: 'What is Async Authorization?',
			action: `Explain asynchronous auth`,
		},
		{
			title: 'What is Token Vault?',
			action: `Explain how I can use 3rd party tokens`,
		},
		{
			title: 'What am I supposed to be doing?',
			label: null,
			action: 'Explain the purpose of this app',
		},
		{
			title: 'Show me my accounts',
			label: null,
			action: 'Show me my accounts',
		},
		{
			title: 'Show me my transactions',
			label: null,
			action: 'Show me my transactions',
		},
		{
			title: 'Forecast for Las Vegas?',
			label: null,
			action: 'What is the weather in Las Vegas?',
		},
	];

	return (
		<Collapsible {...{ open, onOpenChange }}>
			<CollapsibleTrigger
				asChild
				className='flex items-center justify-end-safe'
			>
				<div>
					<Button
						variant='ghost'
						type='button'
					>
						{open ? 'Hide suggestions' : 'Show suggestions'}
						<ArrowIcon
							className={cn(
								'transition-transform duration-300',
								open ? 'rotate-180' : 'rotate-0'
							)}
						/>
					</Button>
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent className='CollapsibleContent'>
				<div
					data-testid='suggested-actions'
					className='flex flex-wrap justify-stretch gap-2'
				>
					{suggestedActions.map((suggestedAction, index) => (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ delay: 0.05 * index }}
							key={`suggested-action-${suggestedAction.title}-${index}`}
							className={cn('flex-1', index > 1 ? 'hidden sm:block' : 'block')}
						>
							<Button
								variant='ghost'
								onClick={async () => {
									window.history.replaceState({}, '', `/chat/${chatId}`);

									sendMessage({
										role: 'user',
										parts: [{ type: 'text', text: suggestedAction.action }],
									});
								}}
								className='h-auto w-full items-start justify-start gap-1 rounded-xl border p-3 text-left text-xs sm:flex-col'
							>
								<span className='font-medium'>{suggestedAction.title}</span>
								<span className='text-muted-foreground'>
									{suggestedAction?.label !== null
										? suggestedAction?.label || suggestedAction?.action
										: null}
								</span>
							</Button>
						</motion.div>
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}
