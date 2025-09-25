'use client';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface ChatActionCardProps extends ButtonProps {
	label: string;
	cta?: React.ReactNode;
	icon?: React.ReactElement;
	animateIcon?: boolean;
}

export function ChatActionCard({
	animateIcon = true,
	cta = 'Click to begin',
	label,
	...props
}: ChatActionCardProps) {
	const [animate, setAnimate] = useState(animateIcon);

	const {
		href,
		icon = (
			<ArrowDown
				className={cn('rotate-90', { 'motion-safe:animate-bounce': animate })}
			/>
		),
		...rest
	} = props;

	useEffect(() => {
		const timer = setTimeout(() => setAnimate(false), 60 * 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='flex items-center gap-4 py-6'>
			<Button {...{ href, target: '_blank', ...rest }}>{label}</Button>

			<div className='flex items-center gap-2 italic'>
				{icon}
				{cta}
			</div>
		</div>
	);
}
