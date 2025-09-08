import {
	Authenticators,
	DebugCard,
	LinkedAccounts,
	UserProfileCard,
} from '@/components/features/user-profile';
import { Header } from '@/components/layout/header';
import { getSession } from '@/lib/auth0';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Profile',
};

export default async function ProfilePage() {
	const { tokenSet, user } = (await getSession()) || {};

	if (!user?.sub) {
		const { redirect } = await import('next/navigation');

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
