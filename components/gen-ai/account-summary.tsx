import {
	AccountSummaryCard,
	type AccountSummaryCardProps,
} from '@/components/features/accounts/account-summary-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

import type { Accounts } from '@/types';

export interface AccountSummaryProps extends React.ComponentProps<'div'> {
	accounts?: Accounts.Account[];
	AccountSummaryCardProps?: Omit<AccountSummaryCardProps, 'account' | 'ref'>;
}

export const AccountSummary = ({
	accounts = [],
	AccountSummaryCardProps,
	className,
	...props
}: AccountSummaryProps) => {
	return (
		<ScrollArea className='-ms-8 w-full max-w-5xl mask-r-from-95% mask-l-from-95% whitespace-nowrap'>
			<div
				{...{
					...props,
					className: cn(
						'flex w-max flex-nowrap items-center gap-3 first:ps-8 last:pe-8',
						className
					),
				}}
			>
				{accounts?.map((account) => (
					<AccountSummaryCard
						key={`account-card-${account.id}`}
						{...{
							...AccountSummaryCardProps,
							account,
							className: 'min-w-[332px]',
						}}
					/>
				))}
			</div>
			<ScrollBar
				className='hidden'
				orientation='horizontal'
			/>
		</ScrollArea>
	);
};
