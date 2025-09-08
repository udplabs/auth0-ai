import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from './ui/button';

export interface AnimatedButtonProps extends Omit<ButtonProps, 'children'> {
	icon: React.ReactNode;
	label: string;
	LabelProps?: React.HTMLAttributes<HTMLSpanElement>;
}

export const AnimatedButton = ({
	icon,
	className,
	variant = 'outline',
	label = 'Click me',
	LabelProps,
	...props
}: AnimatedButtonProps) => {
	return (
		<Button
			aria-label={label}
			{...{
				className: cn(
					'ps-2 pe-0 md:h-fit -py-2 min-h-[34px] min-w-[34px]',
					className,
					'group inline-flex items-center overflow-hidden transition-all motion-safe:duration-350'
				),
				variant,
				...props,
			}}
		>
			{icon}
			{
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
					{label}
				</span>
			}
		</Button>
	);
};
