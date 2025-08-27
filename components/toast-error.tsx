import { cn } from '@/lib/utils/utils';

interface ToastErrorProps extends React.PropsWithChildren {
	message?: string;
	MessageProps?: React.ComponentProps<'p'>;
}
export const ToastError = ({
	message = 'Oops!',
	MessageProps,
	children,
}: ToastErrorProps) => {
	return (
		<div>
			<p
				{...{
					...MessageProps,
					className: cn('font-bold', MessageProps?.className),
				}}
			>
				{message}
			</p>
			{children}
		</div>
	);
};
