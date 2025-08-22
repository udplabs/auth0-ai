import { Button } from '@/components/ui/button';
import { type SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import type { ComponentProps } from 'react';

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';

export function SidebarToggle({
	className,
}: ComponentProps<typeof SidebarTrigger>) {
	const { open, toggleSidebar } = useSidebar();

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					data-testid='sidebar-toggle-button'
					onClick={toggleSidebar}
					variant='outline'
					className='md:h-fit md:px-2'
				>
					{open ? (
						<PanelLeftCloseIcon size={16} />
					) : (
						<PanelLeftOpenIcon size={16} />
					)}
				</Button>
			</TooltipTrigger>
			<TooltipContent align='start'>Toggle Sidebar</TooltipContent>
		</Tooltip>
	);
}
