'use client';

import Link from 'next/link';

import { ModeToggle } from '@/components/mode-toggle';
import { SidebarToggle } from '@/components/app-sidebar';
import { Button } from '@/components/ui';
import { VercelIcon } from './icons';
import { memo } from 'react';

export interface HeaderProps extends React.PropsWithChildren {
  hideSecondaryActions?: boolean;
}

function PureHeader({ children, hideSecondaryActions = false }: HeaderProps) {
  return (
    <header className="flex sticky w-full top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />
      {children}
      {!hideSecondaryActions && (
        <div className="flex flex-1 items-center order-4 md:ml-auto gap-2 justify-end">
          <ModeToggle className="order-1 md:order-2" variant="dropdown" />

          <Button
            className="bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-2 md:order-1 "
            asChild
          >
            <Link
              href={`https://vercel.com/new/clone?repository-url=https://github.com/vercel/ai-chatbot&env=AUTH_SECRET&envDescription=Learn more about how to get the API Keys for the application&envLink=https://github.com/vercel/ai-chatbot/blob/main/.env.example&demo-title=AI Chatbot&demo-description=An Open-Source AI Chatbot Template Built With Next.js and the AI SDK by Vercel.&demo-url=https://chat.vercel.ai&products=[{"type":"integration","protocol":"ai","productSlug":"grok","integrationSlug":"xai"},{"type":"integration","protocol":"storage","productSlug":"neon","integrationSlug":"neon"},{"type":"integration","protocol":"storage","productSlug":"upstash-kv","integrationSlug":"upstash"},{"type":"blob"}]`}
              target="_noblank"
            >
              <VercelIcon size={16} />
              Deploy with Vercel
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}

export const Header = memo(PureHeader, (prevProps, nextProps) => {
  return (
    prevProps.children === nextProps.children &&
    prevProps.hideSecondaryActions === nextProps.hideSecondaryActions
  );
});
