'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useRef, useState } from 'react';

export interface CountDownButtonProps extends Omit<ButtonProps, 'children'> {
	/**
	 * Countdown duration in milliseconds.
	 */
	duration: number;
	/**
	 * Determines whether the time is placed before or after the label (children)
	 *
	 * @default `after`
	 */
	position?: 'before' | 'after';
	/**
	 * Determines how the countdown is presented.
	 *
	 * Parenthesis: `(5)`
	 * Brackets: `[5]`
	 * None: `5`
	 *
	 * @default `parenthesis`
	 */
	countDownStyle?: 'parenthesis' | 'brackets' | 'none';
	/**
	 * The value to place either before or after the countdown.
	 */
	label?: string;
	/**
	 * If provided, this will replace `label` upon countdown completion.
	 */
	finalLabel?: string;
	/**
	 * Default behavior is to disable once the countdown has completed (like an Undo button);
	 *
	 * Set this to `true` if desired behavior is different.
	 *
	 * @default `false`
	 */
	disableWhileCounting?: boolean;
	/**
	 * If an action should be taken when the countdown ends, provide it.
	 */
	onComplete?: () => void;
}

export const CountDownButton = ({
	countDownStyle = 'parenthesis',
	disabled = false,
	duration,
	finalLabel,
	label,
	position = 'after',
	disableWhileCounting = false,
	onComplete,
	...props
}: CountDownButtonProps) => {
	const completedRef = useRef(false);
	console.log('duration:', duration);

	const initialSeconds = useMemo(
		() => Math.max(0, Math.ceil(duration / 1000)),
		[duration]
	);

	const [countDown, setCountDown] = useState(initialSeconds);

	useEffect(() => {
		setCountDown(initialSeconds);
		completedRef.current = false;
	}, [initialSeconds]);

	useEffect(() => {
		if (countDown === 0) {
			if (!completedRef.current) {
				completedRef.current = true;
				onComplete?.();
			}
			return; // no interval if already at 0
		}

		const countDownInterval = setInterval(() => {
			setCountDown((prev) => Math.max(0, prev - 1));
		}, 1000);

		return () => clearInterval(countDownInterval);
	}, [countDown, onComplete]);

	// Format countDown
	const token = useMemo(() => {
		if (countDownStyle === 'brackets') return `[${countDown}]`;
		if (countDownStyle === 'parenthesis') return `(${countDown})`;
		return `${countDown}`;
	}, [countDown, countDownStyle]);

	// Compose safe label
	const baseLabel = countDown === 0 && finalLabel ? finalLabel : (label ?? '');

	const text =
		baseLabel && countDown > 0
			? position === 'before'
				? `${token} ${baseLabel}`
				: `${baseLabel} ${token}`
			: baseLabel || token;

	const isDisabled =
		disabled || (disableWhileCounting && countDown > 0) || countDown === 0;

	return (
		<Button
			{...{
				variant: 'destructive',
				...props,
				size: 'sm',
				className: cn('text-xs w-full', props?.className),
			}}
			disabled={isDisabled}
		>
			{text}
		</Button>
	);
};
