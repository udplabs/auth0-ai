'use client';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	BugOffIcon,
	EyeIcon,
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
				className='rounded-2xl border-none bg-transparent pe-0 shadow-none'
			>
				<div className='flex flex-col-reverse items-end gap-y-2'>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								className='h-8 w-8 rounded-full bg-green-500 p-4'
								onClick={() => handleVectorReInit()}
							>
								<WandSparkles className='h-5 w-5' />
							</Button>
						</TooltipTrigger>
						<TooltipContent
							align='end'
							side='left'
							className='border-none bg-transparent shadow-none'
						>
							Initialize Vector Store
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								className='h-8 w-8 rounded-full p-4'
								onClick={() => handleVectorReset()}
								variant='destructive'
							>
								<RotateCcwIcon className='h-5 w-5' />
							</Button>
						</TooltipTrigger>
						<TooltipContent
							align='end'
							side='left'
							className='border-none bg-transparent shadow-none'
						>
							Reset Vector Store
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								className='h-8 w-8 rounded-full p-4'
								onClick={() => handleVectorSummary()}
							>
								<EyeIcon className='h-5 w-5' />
							</Button>
						</TooltipTrigger>
						<TooltipContent
							align='end'
							side='left'
							className='border-none bg-transparent shadow-none'
						>
							Get Vector Store Summary
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
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
						</TooltipTrigger>
						<TooltipContent
							align='end'
							side='left'
							className='border-none bg-transparent shadow-none'
						>
							Reset 'first-message'
						</TooltipContent>
					</Tooltip>
				</div>
			</PopoverContent>
		</Popover>
	);
};
