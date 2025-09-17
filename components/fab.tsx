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
					<Button
						className='p-0 pl-2'
						variant='ghost'
						onClick={() => {
							localStorage.removeItem(LS_KEY_FIRST);
							localStorage.removeItem(LS_KEY_AUTH);
							redirect('/chat');
						}}
					>
						{`Resend 'first-message'`}
						<div className='rounded-full bg-yellow-500 p-2 text-white hover:bg-yellow-600'>
							<CircleArrowOutUpRightIcon className='h-8 w-8' />
						</div>
					</Button>
					<Button
						className='p-0 pl-2'
						variant='ghost'
						onClick={() => {
							localStorage.setItem(LS_KEY_AUTH, 'false');
							redirect('/chat');
						}}
					>
						{`Resend 'authenticated-message'`}
						<div className='rounded-full bg-yellow-500 p-2 text-white hover:bg-yellow-600'>
							<RotateCcwIcon className='h-8 w-8' />
						</div>
					</Button>
					<Button
						className='p-0 pl-2'
						variant='ghost'
						onClick={() => resetPermissions()}
					>
						Reset Account Permissions
						<div className='bg-destructive text-destructive-foreground hover:bg-destructive/80 rounded-full p-2'>
							<RefreshCcwDot className='h-8 w-8' />
						</div>
					</Button>
					<Button
						className='p-0 pl-2'
						variant='ghost'
						onClick={() => handleVectorReInit()}
					>
						Initialize Vector Store
						<div className='rounded-full bg-green-500 p-2 text-white hover:bg-green-600'>
							<WandSparkles className='h-8 w-8' />
						</div>
					</Button>
					<Button
						className='p-0 pl-2'
						variant='ghost'
						onClick={() => {
							handleEmbeddingsBuild()
								.then(() => {
									mutate();
								})
								.finally(() => handleVectorReset());
						}}
					>
						Regenerate Embeddings
						<div className='rounded-full bg-yellow-500 p-2 text-white hover:bg-yellow-600'>
							<FileStackIcon className='h-8 w-8' />
						</div>
					</Button>
					<Button
						className='p-0 pl-2'
						variant='ghost'
						onClick={() => handleVectorReset()}
					>
						Reset Vector Store
						<div className='bg-destructive text-destructive-foreground hover:bg-destructive/80 rounded-full p-2'>
							<RotateCcwIcon className='h-8 w-8' />
						</div>
					</Button>
					<Button
						className='p-0 pl-2'
						variant='ghost'
						onClick={() => handleVectorSummary()}
					>
						Get Vector Store Summary
						<div className='rounded-full bg-green-500 p-2 text-white hover:bg-green-600'>
							<EyeIcon className='h-8 w-8' />
						</div>
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};
