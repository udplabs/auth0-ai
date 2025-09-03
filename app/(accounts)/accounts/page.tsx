'use client';

import { AccountSummary } from '@/components/features/accounts/account-summary';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { useUserProfile } from '@/hooks';
import { Bell, Settings } from 'lucide-react';

export default function AccountsPage() {
	const { data: user } = useUserProfile();

	return (
		<div className='bg-background flex h-dvh min-w-0 flex-col'>
			<Header>
				<span className='font-bold'>Accounts</span>
			</Header>
			<div className='container mx-auto max-w-7xl py-4'>
				<div className='flex flex-col gap-8'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-3xl font-bold tracking-tight'>
								Welcome,{' '}
								<span className='text-bank-primary'>{user?.displayName}</span>
							</h1>
							<p className='text-muted-foreground'>
								Here's an overview of your accounts
							</p>
						</div>
						<div className='flex items-center gap-2'>
							<Button
								variant='outline'
								size='icon'
							>
								<Bell className='h-4 w-4' />
								<span className='sr-only'>Notifications</span>
							</Button>
							<Button
								variant='outline'
								size='icon'
								href='/settings'
							>
								<Settings className='h-4 w-4' />
								<span className='sr-only'>Settings</span>
							</Button>
						</div>
					</div>
					<AccountSummary />
				</div>
			</div>
		</div>
	);
}
