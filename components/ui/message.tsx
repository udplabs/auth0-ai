import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils/index';
import { Markdown } from './markdown';

export type MessageProps = {
	children: React.ReactNode;
	className?: string;
} & React.HTMLProps<HTMLDivElement>;

const Message = ({ children, className, ...props }: MessageProps) => (
	<div
		className={cn(
			'flex w-full gap-4',
			'group-data-[role=user]/message:ml-auto group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl',
			className
		)}
		{...props}
	>
		{children}
	</div>
);

export type MessageAvatarProps = {
	src?: string;
	alt?: string;
	fallback?: string | boolean;
	delayMs?: number;
	className?: string;
	children?: React.ReactNode;
};

const MessageAvatar = ({
	src,
	alt = '',
	fallback,
	delayMs,
	className,
	children,
}: MessageAvatarProps) => {
	return (
		<Avatar className={cn('h-8 w-8 shrink-0', className)}>
			{src && !children && (
				<AvatarImage
					src={src}
					alt={alt}
				/>
			)}
			{fallback === true && children && (
				<AvatarFallback>{children}</AvatarFallback>
			)}
			{typeof fallback === 'string' && !children && (
				<AvatarFallback delayMs={delayMs}>{fallback}</AvatarFallback>
			)}
		</Avatar>
	);
};

export type MessageContentProps = {
	children: React.ReactNode;
	markdown?: boolean;
	className?: string;
} & React.ComponentProps<typeof Markdown> &
	React.HTMLProps<HTMLDivElement>;

const MessageContent = ({
	children,
	markdown = false,
	className,
	...props
}: MessageContentProps) => {
	const classNames = cn(
		'rounded-lg p-2 text-foreground bg-secondary prose break-words whitespace-normal',
		className
	);
	return markdown ? (
		<Markdown
			className={classNames}
			{...props}
		>
			{children as string}
		</Markdown>
	) : (
		<div
			className={classNames}
			{...props}
		>
			{children}
		</div>
	);
};

export type MessageActionsProps = {
	children: React.ReactNode;
	className?: string;
} & React.HTMLProps<HTMLDivElement>;

const MessageActions = ({
	children,
	className,
	...props
}: MessageActionsProps) => (
	<div
		className={cn('text-muted-foreground flex items-center gap-2', className)}
		{...props}
	>
		{children}
	</div>
);

export type MessageActionProps = {
	className?: string;
	tooltip: React.ReactNode;
	children: React.ReactNode;
	side?: 'top' | 'bottom' | 'left' | 'right';
} & React.ComponentProps<typeof Tooltip>;

const MessageAction = ({
	tooltip,
	children,
	className,
	side = 'top',
	...props
}: MessageActionProps) => {
	return (
		<TooltipProvider>
			<Tooltip {...props}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					className={className}
				>
					{tooltip}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export {
	Message,
	MessageAction,
	MessageActions,
	MessageAvatar,
	MessageContent,
};
