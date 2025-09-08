'use client';

import { NewChatButton } from '@/components/features/chat/ui/new-chat-button';
import { SidebarToggle } from '@/components/layout/app-sidebar';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { VercelButton } from '@/components/vercel-button';
import { useUser } from '@auth0/nextjs-auth0';
import { PiggyBankIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';
import { AnimatedButton } from '../animated-button';

export interface HeaderProps extends React.PropsWithChildren {
	hideSecondaryActions?: boolean;
	label?: React.ReactNode;
}

export function Header({
	children,
	label,
	hideSecondaryActions = false,
}: HeaderProps) {
	const { open } = useSidebar();
	const { width: windowWidth } = useWindowSize();
	const { user } = useUser();
	const pathname = usePathname();

	const showIcons = !open || windowWidth < 768;

	return (
		<header className='bg-background sticky top-0 flex w-full items-center gap-2 px-2 py-1.5 md:px-2'>
			<SidebarToggle
				className='order-1'
				animated
			/>
			{showIcons && (
				<>
					{!pathname.includes('accounts') && (
						<AnimatedButton
							icon={<PiggyBankIcon />}
							label='Account Dashboard'
							className='order-2'
						/>
					)}
					<NewChatButton
						animated
						variant='outline'
						className='order-3 ml-auto px-2 md:ml-0 md:h-fit md:px-2'
					/>
				</>
			)}
			<div className='order-4'>
				{typeof label === 'string' ? (
					<span className='font-bold'>{label}</span>
				) : (
					label
				)}
				{children}
			</div>
			{!hideSecondaryActions && (
				<div className='order-5 flex flex-1 items-center justify-end gap-2 md:ml-auto'>
					{!user && (
						<>
							<Button
								className='order-1 h-[34px]'
								href='/auth/login?screen_hint=signup'
								variant='outline'
							>
								Sign Up
							</Button>
						</>
					)}
					{!user && showIcons && (
						<>
							<Button
								className='order-1 h-[34px]'
								href='/auth/login'
							>
								Log In
							</Button>
						</>
					)}
					{user && showIcons && (
						<>
							<Button
								className='order-1 h-[34px]'
								href='/auth/logout'
							>
								Log Out
							</Button>
						</>
					)}
					<ModeToggle
						className='order-2'
						variant='dropdown'
						animated
					/>
					<VercelButton className='order-3' />
				</div>
			)}
		</header>
	);
}
