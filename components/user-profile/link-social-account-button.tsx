'use client';

import { linkAccount } from '@/lib/auth0/link-account';
import { unlinkAccount } from '@/lib/auth0/unlink-account';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import {
  Button,
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from '@/components/ui';

export const LinkSocialAccountButton: React.FC<Props> = ({
  provider,
  label,
  icon,
  isConnected = false,
  userId,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
            <FontAwesomeIcon icon={icon} className="text-2xl" />
          </div>
          <CardTitle>{label}</CardTitle>
        </div>
        <CardAction>
          {isConnected ? (
            <form action={unlinkAccount}>
              <input type="hidden" name="provider" value={provider} />
              <input type="hidden" name="user_id" value={userId ?? ''} />
              <Button
                type="submit"
                className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Disconnect
              </Button>
            </form>
          ) : (
            <form action={linkAccount}>
              <input type="hidden" name="connection" value={provider} />
              <Button type="submit">Connect</Button>
              <Button type="submit">Connect</Button>
              <Button
                type="submit"
                style={{
                  background:
                    'linear-gradient(26deg, rgba(255, 255, 255, 0.08) -32.04%, rgba(255, 255, 255, 0.00) 133.43%) !important',
                  backdropFilter: 'blur(20px)',
                  border: '1.5px solid #FFFEFA',
                  borderRadius: '6px',
                }}
              >
                Connect
              </Button>
            </form>
          )}
        </CardAction>
      </CardHeader>
    </Card>
  );
};

interface Props {
  provider: string;
  label: string;
  icon: IconDefinition;
  isConnected?: boolean;
  userId?: string;
}
