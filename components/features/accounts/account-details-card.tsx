'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	type CardProps,
} from '@/components/ui/card';
import { useAccounts } from '@/hooks/use-accounts';
import { startCase } from 'lodash-es';
import { CurrencyField, DateField } from './ui';

interface AccountDetailsCardProps extends CardProps {
	accountId: string;
	CardContentProps?: CardProps;
	CardDescriptionProps?: CardProps;
	CardHeaderProps?: CardProps;
	CardTitleProps?: CardProps;
}

export const AccountDetailsCard = ({
	accountId,
	CardContentProps,
	CardDescriptionProps,
	CardHeaderProps,
	CardTitleProps,
	...props
}: AccountDetailsCardProps) => {
	const { data: accounts = [] } = useAccounts();

	const account = accounts.find((a) => a.id === accountId);

	if (!account) return null;

	const {
		balance,
		displayName,
		currencyCode,
		name,
		number,
		openedDate,
		subType,
	} = account || {};

	const availableBalance = (account as Accounts.Account<'deposit'>)
		?.availableBalance;
	const creditLimit = (account as Accounts.Account<'credit'>)?.creditLimit;

	return (
		<Card {...props}>
			<CardHeader {...CardHeaderProps}>
				<CardTitle {...CardTitleProps}>
					{displayName || startCase(name)}
				</CardTitle>
				<CardDescription {...CardDescriptionProps}>
					Account #{number}
				</CardDescription>
			</CardHeader>
			<CardContent {...CardContentProps}>
				<div className='space-y-4'>
					<div>
						<p className='text-muted-foreground text-sm'>Current Balance</p>
						<p className='text-3xl font-bold'>
							<CurrencyField>{balance}</CurrencyField>
						</p>
					</div>
					<div>
						<p className='text-muted-foreground text-sm'>
							{availableBalance ? 'Available Balance' : 'Credit Limit'}
						</p>
						<p className='text-xl'>
							<CurrencyField {...{ currencyCode }}>
								{availableBalance ?? creditLimit}
							</CurrencyField>
						</p>
					</div>
					<div className='pt-4'>
						<p className='text-muted-foreground text-sm'>Account Details</p>
						<div className='grid grid-cols-2 gap-2 pt-2'>
							<p className='text-sm'>Account Type:</p>
							<p className='text-sm font-medium'>{startCase(subType)}</p>
							{'dividendRate' in account && (
								<>
									<p className='text-sm'>Dividend Rate:</p>
									<p className='text-sm font-medium'>
										{account.dividendRate ?? 0}%
									</p>
									<p className='text-sm'>Dividends YTD:</p>
									<p className='text-sm font-medium'>
										<CurrencyField {...{ currencyCode }}>
											{account.interestYTD}
										</CurrencyField>
									</p>
								</>
							)}
							{'balanceDue' in account && (
								<>
									<p className='text-sm'>Amount Due:</p>
									<p className='text-sm font-medium'>
										<CurrencyField {...{ currencyCode }}>
											{account.balanceDue}
										</CurrencyField>
									</p>
									<p className='text-sm'>Due By:</p>
									<p className='text-sm font-medium'>
										<DateField>{account.dueDate}</DateField>
									</p>
									<p className='text-sm'>Next Payment Date:</p>
									<p className='text-sm font-medium'>
										<DateField>{account.nextPaymentDate}</DateField>
									</p>
									<p className='text-sm'>Last Payment Date:</p>
									<p className='text-sm font-medium'>
										<DateField>{account.lastPaymentDate}</DateField>
									</p>
								</>
							)}
							{'originalPrincipal' in account && (
								<>
									<p className='text-sm'>Original Principal:</p>
									<p className='text-sm font-medium'>
										<CurrencyField {...{ currencyCode }}>
											{account?.originalPrincipal}
										</CurrencyField>
									</p>
									<p className='text-sm'>Current Principal:</p>
									<p className='text-sm font-medium'>
										<CurrencyField {...{ currencyCode }}>
											{account?.currentPrincipal}
										</CurrencyField>
									</p>
								</>
							)}

							<p className='text-sm'>Opened On:</p>
							<p className='text-sm font-medium'>
								<DateField>{openedDate}</DateField>
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
