'use client';

import {
	PromptInput as AIPromptInput,
	PromptInputSubmit,
	PromptInputTextarea,
	type PromptInputProps as AIPromptInputProps,
	type PromptInputSubmitProps,
	type PromptInputTextareaProps,
} from '@/components/ui/ai-elements/prompt-input';
import { useChat } from '@/hooks/use-chat';
import { useChatHistory } from '@/hooks/use-chat-history';
import { useSuggestions } from '@/hooks/use-suggestions';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { SuggestedActions } from './suggested-actions';

import type { Chat } from '@/types/chat';

export interface PromptInputProps extends AIPromptInputProps {
	ContainerProps?: React.ComponentProps<'div'>;
	PromptInputTextareaProps?: PromptInputTextareaProps;
	PromptInputSubmitProps?: PromptInputSubmitProps;
}

export const PromptInput = ({
	className,
	ContainerProps,
	PromptInputTextareaProps,
	PromptInputSubmitProps,
	...props
}: PromptInputProps) => {
	const { id: _id } = useParams<{ id?: string | string[] }>();
	const { newChat } = useChatHistory();

	const pathId = _id && Array.isArray(_id) ? _id[0] : _id;

	const { id: chatId, messages, sendMessage, status } = useChat();
	const {
		open: showSuggestions,
		toggleSuggestions,
		shouldShow,
	} = useSuggestions();

	const [localStorageInput, setLocalStorageInput] = useLocalStorage(
		'chat-input',
		''
	);
	const [input, setInput] = useState(localStorageInput);

	useEffect(() => {
		setInput(localStorageInput);
	}, [localStorageInput]);

	useEffect(() => {
		setLocalStorageInput(input);
	}, [input]);

	useEffect(() => {
		// If there is a suggestion that should be shown, show it!
		if (
			!showSuggestions &&
			status === 'ready' &&
			(shouldShow || messages.length === 0)
		) {
			toggleSuggestions(true);
		}
	}, [showSuggestions, toggleSuggestions, shouldShow, status, messages.length]);

	const submitAction = (value: string) => {
		if (!pathId || pathId !== chatId) {
			newChat(chatId);
		}

		if (value.trim()) {
			sendMessage({ text: value });
			setInput('');
			setLocalStorageInput('');

			if (showSuggestions) {
				toggleSuggestions(false);
			}
		}
	};

	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();

		submitAction(input);
	};

	return (
		<div
			{...{
				...ContainerProps,
				className: cn(
					'w-full max-w-5xl self-center',
					ContainerProps?.className
				),
			}}
		>
			<SuggestedActions
				{...{
					open: showSuggestions,
					onOpenChange: toggleSuggestions,
					onSubmit: submitAction,
					className: 'py-2',
				}}
			/>
			<AIPromptInput
				{...{
					...props,
					className: cn('relative', className),
					onSubmit: submitForm,
				}}
			>
				<PromptInputTextarea
					{...{
						...PromptInputTextareaProps,
						className: cn('pr-12', PromptInputTextareaProps?.className),
						onChange: (e) => setInput(e.currentTarget?.value),
						placeholder: 'Say something...',
						value: input,
					}}
				/>
				<PromptInputSubmit
					{...{
						status: status === 'streaming' ? 'streaming' : 'ready',
						disabled: status !== 'streaming' && !input.trim(),
						className: cn(
							'absolute right-1 bottom-1',
							PromptInputSubmitProps?.className
						),
						...PromptInputSubmitProps,
					}}
				/>
			</AIPromptInput>
		</div>
	);
};
