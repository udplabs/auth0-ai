import { Suspense } from 'react';
import {
  Authenticators,
  DebugCard,
  LinkedAccounts,
  UserProfileCard,
} from '@/components/user-profile';
import { Header } from '@/components/header';
import { auth0, getUser } from '@/lib/auth0';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  const { tokenSet, user } = (await auth0.getSession()) || {};

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <Header>
        <span className="font-bold">Profile</span>
      </Header>

      <div className="flex flex-col min-w-0 h-dvh bg-background mx-auto w-full md:max-w-3xl gap-6 p-4 md:p-6">
        <Suspense
          fallback={
            <UserProfileCard skeleton user={Promise.resolve(undefined)} />
          }
        >
          {/* User profile info */}
          <UserProfileCard user={getUser({ userId: user?.sub })} />
        </Suspense>

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
