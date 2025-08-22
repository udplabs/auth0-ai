import { Header } from '@/components/header';
import { Authenticators } from '@/components/user-profile/authenticators/authenticators';
import { DebugCard } from '@/components/user-profile/debug-card';
import { LinkedAccounts } from '@/components/user-profile/linked-accounts';
import { UserProfileCard } from '@/components/user-profile/user-profile-card';
import { auth0 } from '@/lib/auth0/client';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Profile',
};

export default async function ProfilePage() {
	const { tokenSet, user } = (await auth0.getSession()) || {};

	if (!user?.sub) {
		return <div>User not found</div>;
	}

	return (
		<div className='bg-background flex h-dvh min-w-0 flex-col'>
			<Header>
				<span className='font-bold'>Profile</span>
			</Header>

			<div className='bg-background mx-auto flex h-dvh w-full min-w-0 flex-col gap-6 p-4 md:max-w-3xl md:p-6'>
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
