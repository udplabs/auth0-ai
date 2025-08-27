'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export const TransferModal = ({
	accounts = [],
	fromAccountId,
	onChange,
	open = false,
	selectAccount,
	toAccountId,
	toggleModal,
	transferAmount = 0,
	transferFunds,
}: TransferModalProps) => {
	return (
		<Dialog {...{ open, onOpenChange: () => toggleModal() }}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Transfer Money</DialogTitle>
					<DialogDescription>
						Transfer funds between your accounts. This will be processed
						immediately.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid gap-2'>
						<Label htmlFor='from-account'>From Account</Label>
						<Select
							value={fromAccountId}
							onValueChange={(from) => selectAccount({ from })}
						>
							<SelectTrigger id='from-account'>
								<SelectValue placeholder='Select account' />
							</SelectTrigger>
							<SelectContent>
								{accounts.map((account) => (
									<SelectItem
										key={account.id}
										value={account.id}
									>
										{account.name} ($
										{account.balance.toLocaleString('en-US', {
											minimumFractionDigits: 2,
										})}
										)
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='to-account'>To Account</Label>
						<Select
							value={toAccountId}
							onValueChange={(to) => selectAccount({ to })}
						>
							<SelectTrigger id='to-account'>
								<SelectValue placeholder='Select account' />
							</SelectTrigger>
							<SelectContent>
								{accounts
									.filter((account) => account.id !== fromAccountId)
									.map((account) => (
										<SelectItem
											key={account.id}
											value={account.id}
										>
											{account.name} ($
											{account.balance.toLocaleString('en-US', {
												minimumFractionDigits: 2,
											})}
											)
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='amount'>Amount</Label>
						<div className='relative'>
							<span className='text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2'>
								$
							</span>
							<Input
								{...{
									className: 'pl-8',
									id: 'amount',
									onChange,
									placeholder: '0.00',
									type: 'number',
									value: transferAmount.toString(),
								}}
							/>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						variant='outline'
						onClick={() => toggleModal({ open: false })}
					>
						Cancel
					</Button>
					<Button
						onClick={() => transferFunds()}
						disabled={
							!fromAccountId ||
							!toAccountId ||
							!transferAmount ||
							fromAccountId === toAccountId
						}
					>
						Transfer Now
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
interface TransferModalProps extends Transfers.TransferContext {
	children?: React.ReactNode;
	accounts?: Accounts.Account[];
}
