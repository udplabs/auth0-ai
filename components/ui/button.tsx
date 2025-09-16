import { Loader } from '@/components/ui/prompt-kit/loader';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import * as React from 'react';
import type { LabelProps } from '@/components/ui/label';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/80',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				info: 'bg-sidebar-accent/50 text-sidebar-foreground hover:bg-sidebar-accent/10',
				warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
				success: 'bg-green-500 text-white hover:bg-green-600',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	animated?: boolean;
	asChild?: boolean;
	icon?: React.ReactNode;
	href?: string;
	loading?: boolean;
	label?: string;
	LabelProps?: LabelProps
	target?: React.HTMLAttributeAnchorTarget;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			animated = false,
			children,
			className,
			icon,
			href,
			label,
			LabelProps,
			loading = false,
			variant,
			size,
			asChild = !!href,
			target,
			...props
		},
		ref
	) => {
		const Comp = !loading && asChild ? Slot : 'button';

		let buttonChildren: React.ReactNode[] = [];

		if (icon) {
			buttonChildren.push(icon);
		}

		if (animated) {

			if (!variant) {
				variant = 'outline';
			}

			if ((label && children) || (!label && typeof children !== 'string')) {
				console.warn('Either provide `label` OR a string as `children`, not both. Ignoring `children`');
			}

			buttonChildren.push(
				<span
					{...{
						...LabelProps,
						className: cn(
							LabelProps?.className,
							'pointer-events-none ml-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0 w-fit',
							'motion-safe:transition-all motion-safe:duration-350 motion-safe:delay-100',
							'group-hover:max-w-[160px] group-hover:pe-2 group-hover:opacity-100',
							'group-focus-within:max-w-[160px] group-focus-within:pe-2 group-focus-within:opacity-100'
						),
					}}
				>
					{!label && typeof children === 'string' ? children : label}
				</span>
			);
		} else {
			buttonChildren.push(children);
		}


		return (
			<Comp
				aria-label={label}
				className={
					cn(
						buttonVariants({ variant, size, className }),
						{ 'ps-2 pe-0 md:h-fit -py-2 min-h-[34px] min-w-[34px]': animated },
						{ 'group inline-flex items-center overflow-hidden transition-all motion-safe:duration-350': animated }
					)
				}
				ref={ref}
				{...props}
			>
				{loading ? (
					<>
						<span className={cn({ 'opacity-0': loading })}>{children}</span>
						<span className='absolute flex items-center justify-center'>
							<Loader />
						</span>
					</>
				) : href ? (
					<Link {...{ href, target }}>{buttonChildren}</Link>
				) : (
					buttonChildren
				)}
			</Comp>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
