import { Loader } from '@/components/ui/loader';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { BotIcon } from 'lucide-react';

export const ThinkingMessage = () => {
	const role = 'assistant';

	return (
		<motion.div
			data-testid='message-assistant-loading'
			className='group/message mx-auto min-h-96 w-full max-w-3xl px-4'
			initial={{ y: 5, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
			data-role={role}
		>
			<div
				className={cn(
					'flex w-full gap-4 rounded-xl group-data-[role=user]/message:ml-auto group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:px-3 group-data-[role=user]/message:py-2',
					{
						'group-data-[role=user]/message:bg-muted': true,
					}
				)}
			>
				<div className='ring-border flex size-8 shrink-0 items-center justify-center rounded-full ring-1'>
					<BotIcon size={24} />
				</div>

				<div className='flex w-full flex-col gap-2'>
					<div className='text-muted-foreground flex flex-col gap-4'>
						<Loader variant='typing' />
					</div>
				</div>
			</div>
		</motion.div>
	);
};
