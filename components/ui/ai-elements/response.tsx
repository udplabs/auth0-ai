'use client';

import { cn } from '@/lib/utils';
import { type ComponentProps, memo } from 'react';
import rehypeRaw from 'rehype-raw';
import { remarkAlert } from 'remark-github-blockquote-alert';
import 'remark-github-blockquote-alert/alert.css';
import { Streamdown } from 'streamdown';

export type ResponseProps = ComponentProps<typeof Streamdown>;

export const Response = memo(
	({ className, parseIncompleteMarkdown = true, ...props }: ResponseProps) => (
		<Streamdown
			{...{
				...props,
				className: cn(
					'size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
					className
				),
				parseIncompleteMarkdown,
				remarkPlugins: [remarkAlert],
				rehypePlugins: [rehypeRaw],
			}}
		/>
	),
	(prevProps, nextProps) => prevProps.children === nextProps.children
);

Response.displayName = 'Response';
