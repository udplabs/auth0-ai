import {
	AnimatedButton,
	AnimatedButtonProps,
} from '@/components/animated-button';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils/utils';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ulid } from 'ulid';

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
	const router = useRouter();
	const { setOpenMobile } = useSidebar();

	const onClick = _onClick
		? _onClick
		: () => {
				setOpenMobile(false);
				router.replace(`/chat/${ulid()}`);
			};

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
