'use client';

import {
	Suggestion,
	Suggestions,
} from '@/components/ui/ai-elements/suggestion';
import { Button, type ButtonProps } from '@/components/ui/button';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	type CollapsibleContentProps,
	type CollapsibleProps,
	type CollapsibleTriggerProps,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils/utils';
import { motion } from 'framer-motion';
import { ChevronUpIcon as ArrowIcon } from 'lucide-react';

interface SuggestedActionsProps extends Omit<CollapsibleProps, 'onSubmit'> {
	ButtonProps?: Omit<ButtonProps, 'onSubmit'>;
	onSubmit: (value: string) => void;
	CollapsibleContentProps?: CollapsibleContentProps;
	CollapsibleTriggerProps?: CollapsibleTriggerProps;
}

export function SuggestedActions({
	open = true,
	ButtonProps,
	onSubmit,
	...props
}: SuggestedActionsProps) {
	const suggestedActions = [
		'What is FGA for RAG?',
		'What is Async Authorization?',
		'What is Auth0 Token Vault?',
		'What am I supposed to be doing?',
		'Show me my accounts',
		'Show me my transactions',
		"What's the forecast for Las Vegas?",
	];

	return (
		<Collapsible {...{ open, ...props }}>
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
				<Suggestions className='max-w-5xl'>
					{suggestedActions.map((suggestion, index) => (
						<motion.div
							key={`suggestion-${index}`}
							{...{
								initial: { opacity: 0, y: 20 },
								animate: { opacity: 1, y: 0 },
								exit: { opacity: 0, y: 20 },
								transition: { delay: 0.05 * index },
								className: cn(
									'first:pl-8 last:pr-16',
									index > 1 ? 'hidden sm:block' : 'block'
								),
							}}
						>
							<Suggestion
								{...{
									onClick: () => onSubmit(suggestion),
									suggestion,
								}}
							/>
						</motion.div>
					))}
				</Suggestions>
			</CollapsibleContent>
		</Collapsible>
	);
}
