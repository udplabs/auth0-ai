import { Authenticators } from '@/components/features/user-profile/authenticators/authenticators';
import { DebugCard } from '@/components/features/user-profile/debug-card';
import { LinkedAccounts } from '@/components/features/user-profile/linked-accounts';
import { UserProfileCard } from '@/components/features/user-profile/user-profile-card';
import { Header } from '@/components/layout/header';
import { getSession } from '@/lib/auth0/client';
import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Profile',
};

export default async function ProfilePage() {
	const { tokenSet, user } = (await getSession(false)) || {};

	if (!user?.sub) {
		redirect('/');
	}

	return (
		<div className='bg-background flex h-screen min-w-0 flex-col overflow-hidden'>
			<Header label='Profile' />

			<div className='bg-background mx-auto flex size-full min-w-0 flex-col gap-6 overflow-auto p-4 pb-8 md:max-w-4xl md:p-6'>
				{/* User profile info */}
				<UserProfileCard />

				{/* Linked accounts */}
				<LinkedAccounts />

				{/* Authenticators */}
				<Authenticators />

				{/* Debug / full tokens */}
				<DebugCard {...{ tokenSet }} />
			</div>
		</div>
	);
}
