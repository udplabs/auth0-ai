'use client';

import { Button } from '@/components/ui/button';
import { useUserProfile } from '@/hooks/use-user-profile';
import { Bell, Settings } from 'lucide-react';

export function AccountSummaryHeader() {
	const { data: user } = useUserProfile();

	return (
		<div className='flex items-center justify-between'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>
					Welcome,{' '}
					<span className='text-bank-primary'>{user?.displayName}</span>
				</h1>
				<p className='text-muted-foreground'>
					{`Here's an overview of your accounts`}
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
				>
					<Settings className='h-4 w-4' />
					<span className='sr-only'>Settings</span>
				</Button>
			</div>
		</div>
	);
}
