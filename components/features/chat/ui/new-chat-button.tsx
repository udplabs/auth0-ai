import {
	AnimatedButton,
	AnimatedButtonProps,
} from '@/components/animated-button';
import { Button } from '@/components/ui/button';
import { useChatHistory } from '@/hooks/use-chat-history';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';

export interface NewChatButtonProps
	extends Omit<AnimatedButtonProps, 'label' | 'icon'> {
	label?: string;
	icon?: React.ReactNode;
	animated?: boolean;
	children?: React.PropsWithChildren['children'];
}

export const NewChatButton = ({
	animated = false,
	label = 'New Chat',
	icon = <PlusIcon />,
	className,
	onClick: _onClick,
	children,
	variant = 'ghost',
	...props
}: NewChatButtonProps) => {
	const { newChat } = useChatHistory();

	const onClick = _onClick ? _onClick : () => newChat();

	if (animated) {
		return (
			<AnimatedButton
				{...{
					className: cn('h-fit', className),
					onClick,
					type: 'button',
					icon,
					label,
					...props,
				}}
			/>
		);
	}

	return (
		<Button
			{...{ ...props, onClick, variant, className: cn('h-fit', className) }}
		>
			{!children && <PlusIcon />}
			{children}
		</Button>
	);
};
