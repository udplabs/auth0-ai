import { Button, type ButtonProps } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardContentProps,
	CardFooter,
	CardFooterProps,
	CardTitle,
	CardTitleProps,
	type CardProps,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ConnectionPickerProps extends CardProps {
	connections: ExternalConnection[];
	ButtonProps?: ButtonProps;
	CardTitleProps?: CardTitleProps;
	CardContentProps?: CardContentProps;
	CardFooterProps?: CardFooterProps;
}

export const ConnectionPicker = ({
	connections = [],
	ButtonProps,
	CardTitleProps,
	CardContentProps,
	CardFooterProps,
	...props
}: ConnectionPickerProps) => {
	console.log('rendering connection picker...');
	return (
		<div className='mx-auto flex w-full min-w-0 flex-1 flex-col justify-stretch pb-5 md:max-w-3xl'>
			<Card
				{...{
					className: cn('mx-24 flex items-stretch px-5', props?.className),
					...props,
				}}
			>
				<CardTitle
					{...{
						...CardTitleProps,
						className: cn('self-center', CardTitleProps?.className),
					}}
				>
					Select an institution to connect
				</CardTitle>
				<CardContent
					{...{
						...CardContentProps,
						className: cn('flex flex-col gap-4', CardContentProps?.className),
					}}
				>
					{connections.map(({ id, name }) => (
						<Button
							key={id}
							{...{
								...ButtonProps,
								variant: 'secondary',
								className: cn(
									'bg-bank-primary/10 w-full',
									ButtonProps?.className
								),
								href: `/auth/login?connection=${encodeURIComponent(id)}`,
							}}
						>
							{name}
						</Button>
					))}
				</CardContent>
				<CardFooter
					{...{
						...CardFooterProps,
						className: cn(
							'text-foreground self-center text-xs',
							CardFooterProps?.className
						),
					}}
				>
					Not seeing your institution? Check back soon for more!
				</CardFooter>
			</Card>
		</div>
	);
};
