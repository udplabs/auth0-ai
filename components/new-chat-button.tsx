import { Button, type ButtonProps } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	type TooltipContentProps,
	type TooltipProps,
	type TooltipTriggerProps,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ulid } from 'ulid';

export interface NewChatButtonProps extends ButtonProps {
	TooltipProps?: TooltipProps;
	TooltipContentProps?: TooltipContentProps;
	TooltipTriggerProps?: TooltipTriggerProps;
}

export const NewChatButton = ({
	TooltipProps,
	TooltipContentProps,
	TooltipTriggerProps,
	children,
	...props
}: NewChatButtonProps) => {
	const router = useRouter();
	const { setOpenMobile } = useSidebar();
	return (
		<Tooltip {...TooltipProps}>
			<TooltipTrigger
				asChild
				{...TooltipTriggerProps}
			>
				<Button
					{...{
						className: cn('h-fit', props.className),
						onClick: () => {
							setOpenMobile(false);
							router.replace(`/chat/${ulid()}`);
						},
						type: 'button',
						variant: 'ghost',
						...props,
					}}
				>
					{!children && <PlusIcon />}
					{children}
				</Button>
			</TooltipTrigger>
			<TooltipContent align='end'>New Chat</TooltipContent>
		</Tooltip>
	);
};
