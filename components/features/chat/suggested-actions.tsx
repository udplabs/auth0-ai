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
import { useSuggestions } from 'hooks';
import { ChevronUpIcon as ArrowIcon } from 'lucide-react';

interface SuggestedActionsProps extends Omit<CollapsibleProps, 'onSubmit'> {
	ButtonProps?: Omit<ButtonProps, 'onSubmit'>;
	onSubmit: (value: string) => void;
	CollapsibleContentProps?: CollapsibleContentProps;
	CollapsibleTriggerProps?: CollapsibleTriggerProps;
}

export interface SuggestedActions {
	label?: string;
	suggestion: string;
	variant?: string;
	preSubmitAction?: () => void;
	shouldShow?: boolean;
}

export function SuggestedActions({
	open: _open,
	ButtonProps,
	onSubmit,
	...props
}: SuggestedActionsProps) {
	const { open = _open, suggestedActions } = useSuggestions();

	suggestedActions.push(
		...[
			{ suggestion: 'What is FGA for RAG?' },
			{ suggestion: 'What is Async Authorization?' },
			{ suggestion: 'What is Auth0 Token Vault?' },
			{ suggestion: 'What am I supposed to be doing?' },
			{ suggestion: 'Show me my accounts' },
			{ suggestion: 'Show me my transactions' },
			{ suggestion: "What's the forecast for Las Vegas?" },
		]
	);

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
					{suggestedActions.map(
						({ preSubmitAction, suggestion, label, variant }, index) => (
							<motion.div
								key={`suggestion-${index}`}
								{...{
									initial: { opacity: 0, y: 20 },
									animate: { opacity: 1, y: 0 },
									exit: { opacity: 0, y: 20 },
									transition: { delay: 0.05 * index },
									className: cn(
										'first:pl-4 last:pr-16',
										index > 1 ? 'hidden sm:block' : 'block'
									),
								}}
							>
								<Suggestion
									variant={variant as ButtonProps['variant']}
									{...{
										onClick: () => {
											preSubmitAction?.();
											onSubmit(suggestion);
										},
										label,
										suggestion,
									}}
								/>
							</motion.div>
						)
					)}
				</Suggestions>
			</CollapsibleContent>
		</Collapsible>
	);
}
