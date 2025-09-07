'use client';

import { DateField } from '@/components/features/accounts/ui';
import { Loader } from '@/components/ui/ai-elements/loader';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	type CardProps,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTransactions } from '@/hooks/use-transactions';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface TransactionListProps extends CardProps {
	accountId?: string;
	CardContentProps?: CardProps;
	CardDescriptionProps?: CardProps;
	CardHeaderProps?: CardProps;
	CardTitleProps?: CardProps;
}

export const TransactionsList = ({
	accountId,
	CardContentProps,
	CardDescriptionProps,
	CardHeaderProps,
	CardTitleProps,
	...props
}: TransactionListProps) => {
	const { data: transactions = [], isLoading } = useTransactions(accountId);

	return (
		<Card {...props}>
			<CardHeader {...CardHeaderProps}>
				<CardTitle {...CardTitleProps}>Recent Transactions</CardTitle>
				<CardDescription {...CardDescriptionProps}>
					Showing the last {transactions.length} transactions for this account
				</CardDescription>
			</CardHeader>
			<CardContent {...CardContentProps}>
				{isLoading ? (
					<Loader
						className='w-full'
						size={32}
					/>
				) : (
					transactions.map((transaction, i) => (
						<>
							<div
								key={transaction.id}
								className='flex items-center justify-between p-2'
							>
								<div className='flex items-center gap-4'>
									<div
										className={cn(
											'flex h-10 w-10 items-center justify-center rounded-full',
											transaction.type === 'credit'
												? 'bg-green-500/20'
												: 'bg-red-500/20'
										)}
									>
										{transaction.type === 'credit' ? (
											<ArrowDownLeft className='h-5 w-5 text-green-500' />
										) : (
											<ArrowUpRight className='h-5 w-5 text-red-500' />
										)}
									</div>
									<div>
										<p className='font-medium'>{transaction.description}</p>
										<p className='text-muted-foreground text-xs'>
											<DateField>{transaction.date}</DateField>
										</p>
									</div>
								</div>
								<div className='text-right'>
									<p
										className={cn(
											'font-medium',
											transaction.type === 'credit'
												? 'text-green-500'
												: 'text-red-500'
										)}
									>
										{transaction.type === 'credit' ? '+' : '-'}$
										{Math.abs(transaction.amount).toLocaleString('en-US', {
											minimumFractionDigits: 2,
										})}
									</p>
									<p className='text-muted-foreground text-xs'>
										{transaction.budgetCategory}
									</p>
								</div>
							</div>
							{i < transactions.length - 1 && <Separator className='my-2' />}
						</>
					))
				)}
			</CardContent>
		</Card>
	);
};
