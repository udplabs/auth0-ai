'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	type CardProps,
	CardTitle,
} from '@/components/ui/card';
import { useTransactions } from '@/hooks/use-transactions';
import { TransactionsList } from './transactions-list';

interface TransactionCardProps extends CardProps {
	accountId?: string;
	CardContentProps?: CardProps;
	CardDescriptionProps?: CardProps;
	CardHeaderProps?: CardProps;
	CardTitleProps?: CardProps;
}

export const TransactionsCard = ({
	accountId,
	CardContentProps,
	CardDescriptionProps,
	CardHeaderProps,
	CardTitleProps,
	...props
}: TransactionCardProps) => {
	const { data: transactions = [], isLoading: loading } =
		useTransactions(accountId);

	return (
		<Card {...props}>
			<CardHeader {...CardHeaderProps}>
				<CardTitle {...CardTitleProps}>Recent Transactions</CardTitle>
				<CardDescription {...CardDescriptionProps}>
					Showing the last {transactions.length} transactions for this account
				</CardDescription>
			</CardHeader>
			<CardContent {...CardContentProps}>
				<TransactionsList {...{ loading, transactions }} />
			</CardContent>
		</Card>
	);
};
