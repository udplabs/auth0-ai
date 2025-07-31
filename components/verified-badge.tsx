import { BadgeCheckIcon, BadgeXIcon } from 'lucide-react';

import { Badge, type BadgeProps, Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';

export const VerifiedBadge = ({
  label = 'Verified',
  negativeLabel = `Not ${label}`,
  verified = false,
  skeleton = false,
  ...props
}: VerifiedBadgeProps) => {
  if (skeleton) {
    return <Skeleton className="h-6 w-20 rounded-md" />;
  }
  return (
    <Badge
      {...{
        ...props,
        className: cn(
          '!border-red-500 text-red-500',
          verified && '!border-green-600 text-green-600',
          props?.className,
        ),
        variant: 'outline',
      }}
    >
      {verified ? (
        <>
          <BadgeCheckIcon className="h-3 w-3" />
          {label}
        </>
      ) : (
        <>
          <BadgeXIcon className="h-3 2-3" />
          {negativeLabel}
        </>
      )}
      {/* <BadgeCheckIcon color='green' className='h-3 w-3' />
				{verified ? 'Verified' : 'Not Verified'} */}
    </Badge>
  );
};

interface VerifiedBadgeProps extends BadgeProps {
  verified?: boolean;
  negativeLabel?: string;
  label?: string;
  skeleton?: boolean;
}
