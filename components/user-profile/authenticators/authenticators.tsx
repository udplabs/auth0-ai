'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Loader2Icon } from 'lucide-react';
// import { useAuthenticators } from '@/lib/hooks';
import { Authenticator } from './authenticator-card';

// TODO: refactor this whole thing. Temporary

interface HookResponse<T, P = void> {
  isFetching: boolean;
  isMutating?: boolean;
  data: T;
  error?: Error | null;
  mutate: (params: P) => Promise<void>;
}

interface AuthenticatorsResponse {
  enrolled: Factor[];
  available: Factor[];
}

export const Authenticators = () => {
  const {
    data: { enrolled = [] },
    isFetching,
    mutate: deleteAuthenticator,
    isMutating,
  } = { data: {} } as HookResponse<AuthenticatorsResponse, string>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authenticators</CardTitle>
      </CardHeader>
      <CardContent>
        {isFetching ? (
          <Loader2Icon />
        ) : enrolled.length === 0 ? (
          <p className="pb-4 text-base font-medium">
            You do not currently have any authenticators.
          </p>
        ) : (
          enrolled.map((a) => (
            <Authenticator
              key={`${a.type}-${a.id}-2`}
              data={a}
              loading={isMutating}
              onDelete={deleteAuthenticator}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};
