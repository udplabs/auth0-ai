import { Loader } from '@/components/ui/prompt-kit/loader';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils/utils';

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
				info: 'bg-color-sidebar-primary text-color-sidebar-foreground hover:bg-color-sidebar-primary/90',
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
	asChild?: boolean;
	href?: string;
	target?: React.HTMLAttributeAnchorTarget;
	loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			href,
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

		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
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
					<Link {...{ href, target }}>{children}</Link>
				) : (
					children
				)}
			</Comp>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
