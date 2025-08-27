import { AnimatedButton } from '@/components/animated-button';
import { Button, ButtonProps } from '@/components/ui/button';
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

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';

export interface SidebarToggleProps extends ButtonProps {
	TooltipProps?: TooltipProps;
	TooltipTriggerProps?: TooltipTriggerProps;
	TooltipContentProps?: TooltipContentProps;
	animated?: boolean;
}

export function SidebarToggle({
	animated = false,
	className,
	TooltipContentProps,
	TooltipProps,
	TooltipTriggerProps,
	...props
}: SidebarToggleProps) {
	const { open, toggleSidebar } = useSidebar();

	if (animated) {
		return (
			<AnimatedButton
				{...{
					...props,
					icon: open ? (
						<PanelLeftCloseIcon size={16} />
					) : (
						<PanelLeftOpenIcon size={16} />
					),
					className,
					label: `${open ? 'Close' : 'Open'} Sidebar`,
					onClick: toggleSidebar,
				}}
			/>
		);
	}

	return (
		<Tooltip {...TooltipProps}>
			<TooltipTrigger
				asChild
				{...TooltipTriggerProps}
			>
				<Button
					data-testid='sidebar-toggle-button'
					{...{
						onClick: toggleSidebar,
						variant: 'outline',
						className: cn('md:h-fit md:px-2', className),
						...props,
					}}
				>
					{open ? (
						<PanelLeftCloseIcon size={16} />
					) : (
						<PanelLeftOpenIcon size={16} />
					)}
				</Button>
			</TooltipTrigger>
			<TooltipContent
				align='start'
				{...TooltipContentProps}
			>
				Toggle Sidebar
			</TooltipContent>
		</Tooltip>
	);
}
