'use client';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useAccounts } from '@/hooks/use-accounts';
import { authMessageOverride, firstMessageOverride } from '@/lib/signals';
import { cn } from '@/lib/utils';
import { useSignals } from '@preact/signals-react/runtime';
import {
	CircleArrowOutUpRightIcon,
	RefreshCcwDot,
	RotateCcwIcon,
	WrenchIcon,
} from 'lucide-react';
import { redirect } from 'next/navigation';

export const FAB = () => {
	useSignals();
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
					<Button
						className='p-0 pl-2'
						variant='ghost'
						onClick={() => {
							firstMessageOverride.value = true;
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
							authMessageOverride.value = true;
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
				</div>
			</PopoverContent>
		</Popover>
	);
};
