'use client';

import {
	PromptInput as AIPromptInput,
	PromptInputSubmit,
	PromptInputTextarea,
	type PromptInputProps as AIPromptInputProps,
	type PromptInputSubmitProps,
	type PromptInputTextareaProps,
} from '@/components/ui/ai-elements/prompt-input';
import { useChat } from '@/hooks';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { SuggestedActions } from './suggested-actions';

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

	const pathId = _id && Array.isArray(_id) ? _id[0] : _id;

	const {
		id: chatId,
		messages,
		sendMessage,
		status,
	} = useChat<Chat.UIMessage>();

	const [input, setInput] = useState('');

	const [showSuggestions, toggleSuggestions] = useState(messages?.length === 0);

	const submitAction = (value: string) => {
		console.log('click');
		if (!pathId || pathId !== chatId) {
			window.history.replaceState({}, '', `/chat/${chatId}`);
		}

		if (value.trim()) {
			sendMessage({ text: value });
			setInput('');

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
