'use client';

import { Loader, LoaderProps } from '@/components/ui/prompt-kit/loader';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

const THINKING_MESSAGES = [
	'Thinking...',
	'Still thinking...',
	'Almost there...',
	'Maybe not. Still thinking...',
	'This has never happened before...',
	'This is awkward... Look! Squirrel! 🐿️ ',
	"🤦🏻 I'm trying...",
	'🙉 🙈 🙊...',
];
export interface ChatThinkingMessageProps
	extends React.HTMLAttributes<HTMLDivElement> {
	isThinking?: boolean;
	LoaderProps?: LoaderProps;
	animateOnceBeforeCycle?: boolean;
	intervalMs?: number;
	jitterRatio?: number;
}
export const ChatThinkingMessage = ({
	isThinking,
	className,
	LoaderProps,
	intervalMs = 5000,
	animateOnceBeforeCycle = false,
	jitterRatio = 0.4, // 40% up/down when min/max not supplied
	...props
}: ChatThinkingMessageProps) => {
	const [idx, setIdx] = useState(0);
	const startedRef = useRef(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const initialHoldRef = useRef<NodeJS.Timeout | null>(null);

	function nextDelay() {
		const spread = intervalMs & jitterRatio;
		const low = Math.max(50, intervalMs - spread);
		const high = intervalMs + spread;
		return low + Math.random() * (high - low);
	}

	useEffect(() => {
		function clearAll() {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
			if (initialHoldRef.current) {
				clearTimeout(initialHoldRef.current);
				initialHoldRef.current = null;
			}
		}

		if (!isThinking) {
			setIdx(0);
			//cleanup timers
			clearAll();
			startedRef.current = false;
			return;
		}

		// Avoid double setup
		if (startedRef.current) return;

		startedRef.current = true;

		const cycle = () => {
			setIdx((i) =>
				THINKING_MESSAGES.length ? (i + 1) % THINKING_MESSAGES.length : 0
			);
			timeoutRef.current = setTimeout(cycle, nextDelay());
		};

		if (animateOnceBeforeCycle && THINKING_MESSAGES.length > 1) {
			// hold the first message a bit longer (1.4 * random-ish base)
			initialHoldRef.current = setTimeout(cycle, nextDelay() * 1.4);
		} else {
			timeoutRef.current = setTimeout(cycle, nextDelay());
		}

		return () => {
			clearAll();
		};
	}, [isThinking, intervalMs, animateOnceBeforeCycle, jitterRatio]);

	const current = THINKING_MESSAGES[idx] ?? 'Thinking...';

	if (!isThinking) return null;

	return (
		<div
			className={cn(
				'text-muted-foreground flex items-center gap-2 text-sm italic',
				className
			)}
			{...props}
		>
			{isThinking && (
				<Loader {...{ size: 'md', variant: 'wave', ...LoaderProps }} />
			)}
			{current}
		</div>
	);
};
