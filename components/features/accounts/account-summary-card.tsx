'use client';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	type CardProps,
	CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils/utils';
import { startCase } from 'lodash-es';
import { ArrowRight } from 'lucide-react';
import { memo } from 'react';

import { useTransferModal } from '@/hooks/use-transfer-modal';
import { AccountIcon, CurrencyField } from './ui';

export interface AccountSummaryCardProps extends CardProps {
	account: Accounts.Account;
	CardContentProps?: CardProps;
	CardDescriptionProps?: CardProps;
	CardHeaderProps?: CardProps;
	CardFooterProps?: CardProps;
	CardTitleProps?: CardProps;
}

const PureAccountSummaryCard = ({
	account,
	CardContentProps,
	CardDescriptionProps,
	CardFooterProps,
	CardHeaderProps,
	CardTitleProps,
	...props
}: AccountSummaryCardProps) => {
	const { toggleModal } = useTransferModal();
	const { balance, currencyCode, displayName, id, name, number, subType } =
		account;

	const availableBalance = (account as Accounts.Account<'deposit'>)
		?.availableBalance;
	const creditLimit = (account as Accounts.Account<'credit'>)?.creditLimit;

	return (
		<Card
			{...{
				...props,
				className: cn('overflow-hidden py-0 gap-2', props?.className),
			}}
		>
			<CardHeader
				{...{
					...CardHeaderProps,
					className: cn(
						'bg-bank-primary/10 dark:bg-bank-primary/90 p-4 pb-2 flex justify-between',
						CardHeaderProps?.className
					),
				}}
			>
				<div className='flex w-full flex-col'>
					<CardTitle
						{...{
							...CardTitleProps,
							className: cn(
								'tracking-tight max-w-70 text-lg max-h-8 truncate ',
								CardTitleProps?.className
							),
						}}
					>
						{displayName ?? startCase(name)}
					</CardTitle>
					<CardDescription {...CardDescriptionProps}>
						{startCase(subType)} • {number}
					</CardDescription>
				</div>
				<AccountIcon type={account.subType} />
			</CardHeader>
			<CardContent
				{...{
					...CardContentProps,
					className: cn('flex flex-col gap-2', CardContentProps?.className),
				}}
			>
				<div className='flex items-center justify-between'>
					<div className='text-muted-foreground text-sm'>Current Balance</div>
					<div className='text-2xl font-bold'>
						<CurrencyField {...{ currencyCode }}>{balance}</CurrencyField>
					</div>
				</div>
				<div className='text-muted-foreground self-end text-xs'>
					{availableBalance ? 'Available: ' : 'Credit Limit: '}
					<CurrencyField {...{ currencyCode }}>
						{availableBalance ?? creditLimit}
					</CurrencyField>
				</div>
			</CardContent>
			<CardFooter
				{...{
					...CardFooterProps,
					className: cn(
						'flex justify-end w-full border-t gap-2 p-2 !pt-2 max-h-14',
						CardFooterProps?.className
					),
				}}
			>
				<Button
					variant='outline'
					size='sm'
					onClick={() => toggleModal({ from: id })}
				>
					Transfer
				</Button>
				<Button
					variant='ghost'
					size='sm'
					className='gap-1'
					href={`/accounts/${account.id}`}
				>
					Details <ArrowRight className='h-3 w-3' />
				</Button>
			</CardFooter>
		</Card>
	);
};

export const AccountSummaryCard = memo(PureAccountSummaryCard);
