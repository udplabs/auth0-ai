'use client';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useAccounts } from '@/hooks/use-accounts';
import { cn } from '@/lib/utils';
import {
	BugOffIcon,
	EyeIcon,
	LockIcon,
	RotateCcwIcon,
	WandSparkles,
	WrenchIcon,
} from 'lucide-react';
import { redirect } from 'next/navigation';

const handleVectorReInit = async () => {
	await fetch('/api/accounts/db');
};
const handleVectorReset = async () => {
	await fetch('/api/accounts/db', { method: 'DELETE' });
};

const handleVectorSummary = async () => {
	await fetch('/api/accounts/db?count=true');
};

export const FAB = () => {
	const { resetPermissions } = useAccounts();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className='h-12 w-12 rounded-full p-4'>
					<WrenchIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				side='top'
				sideOffset={16}
				align='end'
				alignOffset={8}
				className={cn(
					'rounded-2xl border-none bg-transparent pe-0 shadow-none',
					'bg-background/10 supports-[backdrop-filter]:bg-background/30 backdrop-blur-md'
				)}
			>
				<div className='z-99 flex flex-col-reverse items-end gap-y-2'>
					<div className='flex items-center gap-2'>
						Initialize Vector Store
						<Button
							variant='success'
							className='h-8 w-8 rounded-full p-4'
							onClick={() => handleVectorReInit()}
						>
							<WandSparkles className='h-5 w-5' />
						</Button>
					</div>
					<div className='flex items-center gap-2'>
						Reset Vector Store
						<Button
							className='h-8 w-8 rounded-full p-4'
							onClick={() => handleVectorReset()}
							variant='destructive'
						>
							<RotateCcwIcon className='h-5 w-5' />
						</Button>
					</div>
					<div className='flex items-center gap-2'>
						Get Vector Store Summary
						<Button
							className='h-8 w-8 rounded-full p-4'
							variant='success'
							onClick={() => handleVectorSummary()}
						>
							<EyeIcon className='h-5 w-5' />
						</Button>
					</div>
					<div className='flex items-center gap-2'>
						Reset 'first-message'
						<Button
							className='h-8 w-8 rounded-full p-4'
							variant='destructive'
							onClick={() => {
								localStorage.removeItem('first-message');
								redirect('/chat');
							}}
						>
							<BugOffIcon className='h-5 w-5' />
						</Button>
					</div>
					<div className='flex items-center gap-2'>
						Reset Account Permissions
						<Button
							className='h-8 w-8 rounded-full p-4'
							variant='destructive'
							onClick={() => resetPermissions()}
						>
							<LockIcon className='h-5 w-5' />
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
