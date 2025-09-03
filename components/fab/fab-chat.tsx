'use client';

import { Button } from '@/components/ui/button';
import { useChat } from '@/hooks/use-chat';
import { MessageSquareDashedIcon, MessageSquareHeartIcon } from 'lucide-react';

export const FabChat = () => {
	const { sendMessage } = useChat();
	return (
		<>
			<div className='flex items-center gap-2'>
				Trigger Post Auth Message
				<Button
					className='h-8 w-8 rounded-full p-4'
					variant='destructive'
					onClick={() => {
						sendMessage({
							text: "Hi AIya! I have successfully authenticated. What's next?",
						});
					}}
				>
					<MessageSquareHeartIcon className='h-5 w-5' />
				</Button>
			</div>
			<div className='flex items-center gap-2'>
				Trigger First Message
				<Button
					className='h-8 w-8 rounded-full p-4'
					variant='destructive'
					onClick={() => {
						sendMessage({
							text: 'Hi AIya! This is my first message.',
						});
					}}
				>
					<MessageSquareDashedIcon className='h-5 w-5' />
				</Button>
			</div>
		</>
	);
};
