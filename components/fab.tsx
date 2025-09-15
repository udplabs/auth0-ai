'use client';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useAccounts } from '@/hooks/use-accounts';
import { LS_KEY_AUTH, LS_KEY_FIRST } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
	CircleArrowOutUpRightIcon,
	EyeIcon,
	FileStackIcon,
	LockIcon,
	RefreshCcwDot,
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

const handleEmbeddingsBuild = async () => {
	await fetch('/api/accounts', { method: 'DELETE' });
};

export const FAB = () => {
	const { resetPermissions, mutate } = useAccounts();

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
						Resend 'first-message'
						<Button
							className='h-8 w-8 rounded-full p-4'
							variant='warning'
							onClick={() => {
								localStorage.removeItem(LS_KEY_FIRST);
								localStorage.removeItem(LS_KEY_AUTH);
								redirect('/chat');
							}}
						>
							<CircleArrowOutUpRightIcon className='h-5 w-5' />
						</Button>
					</div>
					<div className='flex items-center gap-2'>
						Resend 'authenticated-message'
						<Button
							className='h-8 w-8 rounded-full p-4'
							variant='warning'
							onClick={() => {
								localStorage.setItem(LS_KEY_AUTH, 'false');
								redirect('/chat');
							}}
						>
							<RotateCcwIcon className='h-5 w-5' />
						</Button>
					</div>
					<div className='flex items-center gap-2'>
						Reset Account Permissions
						<Button
							className='h-8 w-8 rounded-full p-4'
							variant='destructive'
							onClick={() => resetPermissions()}
						>
							<RefreshCcwDot className='h-5 w-5' />
						</Button>
					</div>
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
						Regenerate Embeddings
						<Button
							className='h-8 w-8 rounded-full p-4'
							onClick={() => {
								handleEmbeddingsBuild()
									.then(() => {
										mutate();
									})
									.finally(() => handleVectorReset());
							}}
							variant='warning'
						>
							<FileStackIcon className='h-5 w-5' />
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
				</div>
			</PopoverContent>
		</Popover>
	);
};
