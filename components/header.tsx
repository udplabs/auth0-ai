'use client';

import { memo } from 'react';

import { SidebarToggle } from '@/components/app-sidebar/sidebar-toggle';
import { ModeToggle } from '@/components/mode-toggle';
import { NewChatButton } from '@/components/new-chat-button';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { VercelButton } from '@/components/vercel-button';
import { PiggyBankIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';

export interface HeaderProps extends React.PropsWithChildren {
	hideSecondaryActions?: boolean;
}

function PureHeader({ children, hideSecondaryActions = false }: HeaderProps) {
	const router = useRouter();
	const { open } = useSidebar();
	const { width: windowWidth } = useWindowSize();

	return (
		<header className='bg-background sticky top-0 flex w-full items-center gap-2 px-2 py-1.5 md:px-2'>
			<SidebarToggle />
			{(!open || windowWidth < 768) && (
				<>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='outline'
								className='order-2 ml-auto px-2 md:order-1 md:ml-0 md:h-fit md:px-2'
								onClick={() => {}}
							>
								<PiggyBankIcon />
								<span className='md:sr-only'>Account Dashboard</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Account Dashboard</TooltipContent>
					</Tooltip>
					<NewChatButton
						variant='outline'
						className='order-2 ml-auto px-2 md:order-1 md:ml-0 md:h-fit md:px-2'
					/>
				</>
			)}
			{children}
			{!hideSecondaryActions && (
				<div className='order-4 flex flex-1 items-center justify-end gap-2 md:ml-auto'>
					<ModeToggle
						className='order-1 md:order-2'
						variant='dropdown'
					/>
					<VercelButton className='order-2 md:order-1' />
				</div>
			)}
		</header>
	);
}

export const Header = memo(PureHeader, (prev, next) => {
	if (prev.hideSecondaryActions !== next.hideSecondaryActions) return false;
	if (prev.children !== next.children) return false;
	return true;
});
