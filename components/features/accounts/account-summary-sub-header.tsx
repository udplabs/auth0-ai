'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Card, CardContent, type CardProps } from '@/components/ui/card';
import { useAccounts, useTransferModal } from '@/hooks';
import { cn } from '@/lib/utils';
import { ArrowLeftRight, PlusCircle } from 'lucide-react';

export const AccountSummarySubHeader = ({
	ButtonProps,
	CardContentProps,
	...props
}: AccountSummaryHeaderProps) => {
	const { toggleModal } = useTransferModal();
	const { data: accounts = [] } = useAccounts();

	const totalBalance = accounts?.reduce(
		(sum, account) => sum + (account?.balance ?? 0),
		0
	);
	return (
		<Card {...props}>
			<CardContent {...CardContentProps}>
				<div className='grid gap-6 md:grid-cols-3'>
					<div>
						<p className='text-muted-foreground text-sm font-medium'>
							Total Balance
						</p>
						<p className='text-3xl font-bold'>
							$
							{totalBalance.toLocaleString('en-US', {
								minimumFractionDigits: 2,
							})}
						</p>
					</div>
					<div>
						<p className='text-muted-foreground text-sm font-medium'>
							Number of Accounts
						</p>
						<p className='text-3xl font-bold'>{accounts.length}</p>
					</div>
					<div className='flex items-center justify-end'>
						<div className='flex gap-2'>
							<Button
								{...{
									variant: 'outline',
									...ButtonProps,
									className: cn('gap-2', ButtonProps?.className),
								}}
							>
								<PlusCircle className='h-4 w-4' />
								Add Account
							</Button>
							<Button
								className='gap-2'
								onClick={() => toggleModal()}
							>
								<ArrowLeftRight className='h-4 w-4' />
								Transfer
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
interface AccountSummaryHeaderProps extends React.ComponentProps<'div'> {
	ButtonProps?: ButtonProps;
	CardContentProps?: CardProps;
}
