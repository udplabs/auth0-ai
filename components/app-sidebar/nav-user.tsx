'use client';
import { useUser } from '@auth0/nextjs-auth0';
import { Bell, CircleUserRound, EllipsisVertical, LogOut } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';

export const NavUser = () => {
	const { isMobile } = useSidebar();
	const { user, isLoading } = useUser();
	const { email, nickname, name = nickname, picture } = user || {};

	if (!user) {
		return (
			<Button
				href='/auth/login'
				className='m-4'
				loading={isLoading}
			>
				Log In
			</Button>
		);
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<Avatar
								className='h-8 w-8 rounded-lg grayscale'
								loading={isLoading}
							>
								<AvatarImage
									src={picture}
									alt={name}
								/>
								<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
							</Avatar>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								{/* <Typography className='truncate font-medium' loading={isLoading}>{name}</Typography> */}
								<span className='truncate font-medium'>{name}</span>
								{/* <Typography className='text-muted-foreground truncate text-xs' loading={isLoading}>{email}</Typography> */}
								<span className='text-muted-foreground truncate text-xs'>
									{email}
								</span>
							</div>
							<EllipsisVertical className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
						side={isMobile ? 'bottom' : 'right'}
						align='end'
						sideOffset={4}
					>
						<DropdownMenuLabel className='p-0 font-normal'>
							<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarImage
										src={picture}
										alt={name}
									/>
									<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-medium'>{name}</span>
									<span className='text-muted-foreground truncate text-xs'>
										{email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link href='/profile'>
									<CircleUserRound />
									Profile
								</Link>
							</DropdownMenuItem>

							<DropdownMenuItem asChild>
								<Link href='/notifications'>
									<Bell />
									Notifications
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Button
								href='/auth/logout'
								variant='ghost'
								className='p-0'
							>
								<LogOut />
								Log out
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
