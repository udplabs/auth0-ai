'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDownCircle as CollapseIcon,
  ExternalLinkIcon,
} from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Textarea,
  type CollapsibleProps,
  type CollapsibleContentProps,
  type CollapsibleTriggerProps,
  type CardProps,
} from '@/components/ui';
import { TextField } from '@/components/text-field';
import { cn } from '@/lib/utils';

import type { TokenSet } from '@auth0/nextjs-auth0/types';

export const DebugCard = ({
  tokenSet,
  CardContentProps,
  CollapsibleProps,
  CollapsibleContentProps,
  CollapsibleTriggerProps,
  ...props
}: DebugCardProps) => {
  const [showAccessToken, toggleAccessToken] = useState(false);
  const [showIdToken, toggleIdToken] = useState(false);
  const { accessToken, idToken } = tokenSet || {};

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Debug Data</CardTitle>
      </CardHeader>
      <CardContent
        {...{
          ...CardContentProps,
          className: cn('flex flex-col gap-4', CardContentProps?.className),
        }}
      >
        <Collapsible open={showAccessToken} onOpenChange={toggleAccessToken}>
          <CollapsibleTrigger>
            <div className="flex items-center gap-2">
              Access Token
              <CollapseIcon
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showAccessToken && 'rotate-180',
                )}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField
                readOnly
                label="Expires"
                value={
                  tokenSet?.expiresAt
                    ? new Date(tokenSet.expiresAt * 1000).toLocaleString()
                    : 'N/A'
                }
              />
              <TextField
                readOnly
                label="Scopes"
                value={tokenSet?.scope || 'N/A'}
              />
            </div>
            <Textarea
              readOnly
              value={accessToken}
              className="text-xs rounded resize-none font-mono"
              rows={10}
            />
            <div>
              <Button asChild variant="outline" className="float-end">
                <Link
                  href={`https://jwt.io/#token=${accessToken}`}
                  className="flex items-center gap-2"
                >
                  Decode Token
                  <ExternalLinkIcon className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible open={showIdToken} onOpenChange={toggleIdToken}>
          <CollapsibleTrigger>
            <div className="flex items-center gap-2">
              Id Token
              <CollapseIcon
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showIdToken && 'rotate-180',
                )}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-4 pt-4">
            <div>
              <Textarea
                readOnly
                value={idToken}
                className="text-xs rounded resize-none font-mono"
                rows={10}
              />

              <Button asChild variant="outline" className="float-end mt-4">
                <Link
                  target="_blank"
                  href={`https://jwt.io/#token=${idToken}`}
                  className="flex items-center gap-2"
                >
                  Decode Token
                  <ExternalLinkIcon className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export interface DebugCardProps extends CardProps {
  CardContentProps?: CardProps;
  CollapsibleProps?: CollapsibleProps;
  CollapsibleContentProps?: CollapsibleContentProps;
  CollapsibleTriggerProps?: CollapsibleTriggerProps;
  tokenSet?: TokenSet;
}
