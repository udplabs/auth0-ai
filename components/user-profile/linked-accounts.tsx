'use client';

import { Loader2Icon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// import { useIdentities } from '@/lib/hooks';
import { LinkSocialAccountButton } from './link-social-account-button';
import type { UserIdentity } from 'auth0';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// TODO: redo this entire thing

interface UseIdentitiesResponse {
  identities: UserIdentity[];
  providers: SocialProviderStyle[];
  currentProvider?: string;
  availableProviders: SocialProviderStyle[];
  isFetching?: boolean;
}

export type SocialProviderStyle = {
  provider: string;
  label: string;
  icon: IconDefinition;
  buttonClass: string;
};

export const LinkedAccounts = () => {
  // const {
  // 	data: { availableProviders, identities, currentProvider, providers },
  // 	isFetching,
  // } = useIdentities();
  const {
    availableProviders = [],
    identities = [],
    currentProvider,
    providers = [],
    isFetching,
  } = {} as UseIdentitiesResponse;
  // const isAnyLinkable = providers.some(
  // 	(p) => !identities.some((id) => `${id.provider}|${id.user_id}` === user.sub && id.provider === p.provider)
  // );

  // if (!isAnyLinkable) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linked Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        {isFetching ? (
          <div className="flex gap-4">
            <Loader2Icon className="animate-spin" />
            <p className="text-sm text-gray-400">Loading accounts...</p>
          </div>
        ) : identities.length === 1 ? (
          <p className="text-base font-medium pb-4">{`You do not currently have any linked accounts.${
            availableProviders.length > 0 && ' Would you like to link one?'
          }`}</p>
        ) : (
          identities.map(({ provider, user_id }) => {
            if (currentProvider === provider) {
              return null;
            }

            const p = providers.find((_p) => provider === _p.provider);

            if (p) {
              return (
                <LinkSocialAccountButton
                  key={provider}
                  provider={provider}
                  label={p?.label}
                  icon={p?.icon}
                  isConnected={!!user_id}
                  userId={user_id as string}
                />
              );
            }
          })
        )}
        {availableProviders.map((p) => (
          <LinkSocialAccountButton
            key={p.provider}
            provider={p.provider}
            label={p.label}
            icon={p.icon}
          />
        ))}
      </CardContent>
    </Card>
  );
};
