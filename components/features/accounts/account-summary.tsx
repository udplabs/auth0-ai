'use client';

import { TransferProvider } from '@/components/features/accounts/transfer-provider';
import { Loader } from '@/components/ui/prompt-kit/loader';
import { useAccounts } from '@/hooks';
import { cn } from '@/lib/utils';
import { AccountSummaryCard } from './account-summary-card';
import { AccountSummarySubHeader } from './account-summary-sub-header';

export const AccountSummary = ({ ...props }: AccountSummaryProps) => {
	const { data: accounts = [], isLoading } = useAccounts();

	return (
		<div
			{...{
				...props,
				className: cn('space-y-4 flex gap-4 flex-col', props?.className),
			}}
		>
			{isLoading ? (
				<Loader className='size-32' />
			) : (
				<TransferProvider>
					<AccountSummarySubHeader />
					<div
						{...{
							...props,
							className: cn(
								'grid gap-4 md:grid-cols-2 lg:grid-cols-3',
								props?.className
							),
						}}
					>
						{accounts.map((account) => (
							<AccountSummaryCard
								key={account.id}
								{...{ account, className: 'min-h-[260px] justify-between' }}
							/>
						))}
					</div>
				</TransferProvider>
			)}
		</div>
	);
};
interface AccountSummaryProps extends React.ComponentProps<'div'> {}
