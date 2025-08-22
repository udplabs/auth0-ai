'use client';

import type { UIMessage } from 'ai';
import cx from 'classnames';
import type React from 'react';
import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { toast } from 'sonner';
import { useLocalStorage, useWindowSize } from 'usehooks-ts';

import { SuggestedActions } from '@/components/chat/messages/suggested-actions';
import { Textarea } from '@/components/ui/textarea';
import type { UseChatHelpers } from '@ai-sdk/react';
import { ActionButton } from './action-button';

export function MultimodalInput({
	chatId,
	input,
	setInput,
	status,
	stop,
	messages,
	setMessages,
	sendMessage,
	className,
}: {
	chatId: string;
	input: string;
	setInput: Dispatch<SetStateAction<string>>;
	status: UseChatHelpers<Chat.UIMessage>['status'];
	stop: () => void;
	messages: Array<UIMessage>;
	setMessages: UseChatHelpers<Chat.UIMessage>['setMessages'];
	sendMessage: UseChatHelpers<Chat.UIMessage>['sendMessage'];
	className?: string;
}) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const { width } = useWindowSize();
	const [showSuggestions, toggleSuggestions] = useState(messages?.length === 0);

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

	const resetHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = '98px';
		}
	};

	const [localStorageInput, setLocalStorageInput] = useLocalStorage(
		'input',
		''
	);

	useEffect(() => {
		if (textareaRef.current) {
			const domValue = textareaRef.current.value;
			// Prefer DOM value over localStorage to handle hydration
			const finalValue = domValue || localStorageInput || '';
			setInput(finalValue);
			adjustHeight();
		}
		// Only run once after hydration
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setLocalStorageInput(input);
	}, [input, setLocalStorageInput]);

	const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(event.target.value);
		adjustHeight();
	};

	const submitForm = useCallback(() => {
		window.history.replaceState({}, '', `/chat/${chatId}`);

		sendMessage({
			role: 'user',
			parts: [
				{
					type: 'text',
					text: input,
				},
			],
		});

		setLocalStorageInput('');
		resetHeight();
		setInput('');

		if (showSuggestions) {
			toggleSuggestions(false);
		}

		if (width && width > 768) {
			textareaRef.current?.focus();
		}
	}, [
		input,
		setInput,
		sendMessage,
		setLocalStorageInput,
		width,
		chatId,
		showSuggestions,
		toggleSuggestions,
	]);

	return (
		<div className='relative flex w-full flex-col gap-4'>
			<SuggestedActions
				sendMessage={sendMessage}
				chatId={chatId}
				open={showSuggestions}
				onOpenChange={toggleSuggestions}
			/>

			<Textarea
				data-testid='multimodal-input'
				ref={textareaRef}
				placeholder='Send a message...'
				value={input}
				onChange={handleInput}
				className={cx(
					'bg-muted max-h-[calc(75dvh)] min-h-[24px] resize-none overflow-hidden rounded-2xl pb-10 !text-base dark:border-zinc-700',
					className
				)}
				rows={2}
				autoFocus
				onKeyDown={(event) => {
					if (
						event.key === 'Enter' &&
						!event.shiftKey &&
						!event.nativeEvent.isComposing
					) {
						event.preventDefault();

						if (status !== 'ready') {
							toast.error('Please wait for the model to finish its response!');
						} else {
							submitForm();
						}
					}
				}}
			/>

			<div className='absolute right-0 bottom-0 flex w-fit flex-row justify-end p-2'>
				<ActionButton
					{...(status === 'submitted'
						? { onStop: stop, setMessages }
						: { input, submitForm })}
				/>
			</div>
		</div>
	);
}
