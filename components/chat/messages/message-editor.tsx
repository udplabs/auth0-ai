'use client';

import { deleteTrailingMessages } from '@/app/(chat)/api/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getTextFromMessage } from '@/lib/utils';
import type { UseChatHelpers } from '@ai-sdk/react';
import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';

export type MessageEditorProps = {
	message: Chat.UIMessage;
	setMode: Dispatch<SetStateAction<'view' | 'edit'>>;
	setMessages: UseChatHelpers<Chat.UIMessage>['setMessages'];
	regenerate: UseChatHelpers<Chat.UIMessage>['regenerate'];
};

export function MessageEditor({
	message,
	setMode,
	setMessages,
	regenerate,
}: MessageEditorProps) {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const [draftContent, setDraftContent] = useState<string>(
		getTextFromMessage(message)
	);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textareaRef.current) {
			adjustHeight();
		}
	}, []);

	const adjustHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
		}
	};

	const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDraftContent(event.target.value);
		adjustHeight();
	};

	return (
		<div className='flex w-full flex-col gap-2'>
			<Textarea
				data-testid='message-editor'
				ref={textareaRef}
				className='w-full resize-none overflow-hidden rounded-xl bg-transparent !text-base outline-none'
				value={draftContent}
				onChange={handleInput}
			/>

			<div className='flex flex-row justify-end gap-2'>
				<Button
					variant='outline'
					className='h-fit px-3 py-2'
					onClick={() => {
						setMode('view');
					}}
				>
					Cancel
				</Button>
				<Button
					data-testid='message-editor-send-button'
					variant='default'
					className='h-fit px-3 py-2'
					disabled={isSubmitting}
					onClick={async () => {
						setIsSubmitting(true);

						if (message?.metadata?.userId) {
							await deleteTrailingMessages(message.id, message.metadata.userId);
						}

						setMessages((messages) => {
							const index = messages.findIndex((m) => m.id === message.id);

							if (index !== -1) {
								const updatedMessage: Chat.UIMessage = {
									...message,
									parts: [{ type: 'text', text: draftContent }],
								};

								return [...messages.slice(0, index), updatedMessage];
							}

							return messages;
						});

						setMode('view');
						regenerate();
					}}
				>
					{isSubmitting ? 'Sending...' : 'Send'}
				</Button>
			</div>
		</div>
	);
}
