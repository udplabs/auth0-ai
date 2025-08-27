import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	type AvatarFallbackProps,
	type AvatarImageProps,
	type AvatarProps,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { UIMessage } from 'ai';
import type { HTMLAttributes } from 'react';

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
	from: UIMessage['role'];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
	<div
		id='message'
		className={cn(
			'group flex w-full items-stretch justify-end gap-2 py-4',
			from === 'user' ? 'is-user' : 'is-assistant flex-col-reverse justify-end',
			'[&>div]:max-w-[80%]',
			className
		)}
		{...props}
	/>
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({
	children,
	className,
	...props
}: MessageContentProps) => (
	<div
		id='message-content'
		className={cn(
			'text-foreground flex flex-col gap-2 overflow-hidden rounded-lg px-4 py-3 text-sm',
			'group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground',
			'group-[.is-assistant]:bg-background group-[.is-assistant]:text-foreground group-[.is-assistant]:py-1',
			className
		)}
		{...props}
	>
		<div className='is-user:dark'>{children}</div>
	</div>
);

export interface MessageAvatarProps extends AvatarProps {
	src?: string;
	name?: string;
	fallback?: string | boolean;
	AvatarFallbackProps?: AvatarFallbackProps;
	AvatarImageProps?: AvatarImageProps;
}

export const MessageAvatar = ({
	src,
	name,
	className,
	children,
	fallback,
	AvatarFallbackProps,
	AvatarImageProps,
	...props
}: MessageAvatarProps) => (
	<Avatar
		className={cn('ring-border size-8 ring', className)}
		{...props}
	>
		{(() => {
			if (children) {
				return (
					<AvatarFallback {...AvatarFallbackProps}>{children}</AvatarFallback>
				);
			}

			if (src) {
				return (
					<AvatarImage
						alt=''
						{...{
							...AvatarImageProps,
							src,
							className: cn('mt-0 mb-0', AvatarImageProps?.className),
						}}
					/>
				);
			}

			if (typeof fallback === 'string') {
				return (
					<AvatarFallback {...AvatarFallbackProps}>{fallback}</AvatarFallback>
				);
			}

			return (
				<AvatarFallback {...AvatarFallbackProps}>
					{name?.slice(0, 2) || 'ME'}
				</AvatarFallback>
			);
		})()}
	</Avatar>
);
