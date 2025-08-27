import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { BadgeCheckIcon, BadgeXIcon } from 'lucide-react';

export const VerifiedBadge = ({
	label = 'Verified',
	negativeLabel = `Not ${label}`,
	verified = false,
	loading = false,
	...props
}: VerifiedBadgeProps) => {
	if (loading) {
		return <Skeleton className='h-6 w-20 rounded-md' />;
	}
	return (
		<Badge
			{...{
				...props,
				className: cn(
					'!border-red-500 text-red-500',
					verified && '!border-green-600 text-green-600',
					props?.className
				),
				variant: 'outline',
			}}
		>
			{verified ? (
				<>
					<BadgeCheckIcon className='h-3 w-3' />
					{label}
				</>
			) : (
				<>
					<BadgeXIcon className='2-3 h-3' />
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
	loading?: boolean;
}
