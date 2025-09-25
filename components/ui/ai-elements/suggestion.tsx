'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type React from 'react';
import type { ComponentProps } from 'react';

export type SuggestionsProps = ComponentProps<typeof ScrollArea>;

export const Suggestions = ({
	className,
	children,
	...props
}: SuggestionsProps) => (
	<ScrollArea
		className='w-full overflow-x-auto mask-r-from-90% mask-l-from-98% whitespace-nowrap'
		{...props}
	>
		<div className={cn('flex w-max flex-nowrap items-center gap-2', className)}>
			{children}
		</div>
		<ScrollBar
			className='hidden'
			orientation='horizontal'
		/>
	</ScrollArea>
);

export type SuggestionProps = ComponentProps<typeof Button> & {
	suggestion: string;
	label?: React.ReactNode;
};

export const Suggestion = ({
	label,
	suggestion,
	className,
	variant = 'outline',
	size = 'sm',
	children,
	...props
}: SuggestionProps) => {
	return (
		<Button
			className={cn('cursor-pointer rounded-full px-4', className)}
			size={size}
			type='button'
			variant={variant}
			{...props}
		>
			{children || label || suggestion}
		</Button>
	);
};
