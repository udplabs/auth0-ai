'use client';

import {
	AnimatedButton,
	AnimatedButtonProps,
} from '@/components/animated-button';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
	type DropdownMenuContentProps,
	type DropdownMenuProps,
	type DropdownMenuRadioGroupProps,
	type DropdownMenuRadioItemProps,
	type DropdownMenuTriggerProps,
} from '@/components/ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { Check, Moon, Settings, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ModeToggleProps
	extends Omit<AnimatedButtonProps, 'variant' | 'label' | 'icon'> {
	label?: string;
	variant?: 'toggle' | 'dropdown';
	animated?: boolean;
	DropdownMenuProps?: DropdownMenuProps;
	DropdownMenuContentProps?: DropdownMenuContentProps;
	DropdownMenuRadioGroupProps?: DropdownMenuRadioGroupProps;
	DropdownMenuRadioItemProps?: DropdownMenuRadioItemProps;
	DropdownMenuTriggerProps?: DropdownMenuTriggerProps;
}

export function ModeToggle({
	className,
	animated = false,
	variant = 'toggle',
	label = 'Change Theme',
	DropdownMenuProps,
	DropdownMenuContentProps,
	DropdownMenuRadioGroupProps,
	DropdownMenuRadioItemProps,
	DropdownMenuTriggerProps,
	...props
}: ModeToggleProps) {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	if (variant === 'dropdown') {
		return (
			<DropdownMenu {...DropdownMenuProps}>
				<DropdownMenuTrigger
					asChild
					{...DropdownMenuTriggerProps}
				>
					{animated ? (
						<AnimatedButton
							{...{
								icon: (
									<span className='relative inline-flex items-center'>
										<Sun className='scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
										<Moon className='absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
									</span>
								),
								label,
								className,
								...props,
							}}
						/>
					) : (
						<Button
							{...{
								size: 'icon',
								variant: 'outline',
								className: cn(
									'min-h-[36px] min-w-[36px] h-fit, md:h-fit px-2  md:px-2',
									className
								),
								...props,
							}}
						>
							<Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
							<Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
							<span className='sr-only'>Toggle theme</span>
						</Button>
					)}
				</DropdownMenuTrigger>
				<DropdownMenuContent {...{ align: 'end', ...DropdownMenuContentProps }}>
					<DropdownMenuRadioGroup
						{...{
							value: theme,
							onValueChange: (value) => setTheme(value),
							...DropdownMenuRadioGroupProps,
						}}
					>
						<DropdownMenuRadioItem
							{...{
								value: 'light',
								className: 'flex justify-between',
								indicator: <Check />,
								...DropdownMenuRadioItemProps,
							}}
						>
							<Sun className='h-4 w-4 rotate-0 transition-all dark:-rotate-90' />
							Light
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem
							{...{
								value: 'dark',
								className: 'flex justify-between',
								indicator: <Check />,
								...DropdownMenuRadioItemProps,
							}}
						>
							<Moon className='h-4 w-4 rotate-90 transition-all dark:rotate-0' />
							Dark
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem
							{...{
								value: 'system',
								className: 'flex justify-between',
								indicator: <Check />,
								...DropdownMenuRadioItemProps,
							}}
						>
							<Settings className='h-4 w-4 rotate-90 transition-all dark:rotate-0' />
							System
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<ToggleGroup
			{...{
				variant: 'outline',
				value: theme,
				onValueChange: (value: string) => value && setTheme(value),
				type: 'single',
				className,
			}}
		>
			<ToggleGroupItem
				value='light'
				aria-label='Toggle light theme'
			>
				<Sun className='h-4 w-4 rotate-0 transition-all dark:-rotate-90' />
			</ToggleGroupItem>
			<ToggleGroupItem
				value='dark'
				aria-label='Toggle dark theme'
			>
				<Moon className='h-4 w-4 rotate-90 transition-all dark:rotate-0' />
			</ToggleGroupItem>
			<ToggleGroupItem
				value='system'
				aria-label='Toggle system theme'
			>
				<Settings className='h-4 w-4 rotate-90 transition-all dark:rotate-0' />
			</ToggleGroupItem>
		</ToggleGroup>
	);
}
