import { DateField } from '@/components/features/accounts/ui/date-field';
import { Loader } from '@/components/ui/ai-elements/loader';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { Transactions as TransactionsType } from '@/types/transactions';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface TransactionListProps extends React.HTMLAttributes<HTMLDivElement> {
	loading?: boolean;
	transactions?: TransactionsType.Transaction[];
}

export const TransactionsList = ({
	loading = false,
	transactions = [],
	...props
}: TransactionListProps) => {
	if (loading) {
		return (
			<Loader
				className='w-full'
				size={32}
			/>
		);
	}

	return transactions.map((transaction, i) => (
		<>
			<div
				key={transaction.id}
				{...{
					...props,
					className: cn(
						'flex items-center justify-between p-2',
						props?.className
					),
				}}
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
							transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
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
	));
};
