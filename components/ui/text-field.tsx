import { Input, type InputProps } from '@/components/ui/input';
import { Label, LabelProps } from '@/components/ui/label';
import { cn } from '@/lib/utils/utils';
import { Skeleton } from './skeleton';

export const TextField = ({
	label,
	LabelProps,
	loading = false,
	...props
}: TextFieldProps) => {
	return (
		<div className='flex flex-col gap-2'>
			{label && (
				<Label
					{...{
						...LabelProps,
						className: cn('font-light', LabelProps?.className),
					}}
				>
					{label}
				</Label>
			)}
			{loading ? (
				<Skeleton className='h-10 w-full' />
			) : (
				<Input
					{...{
						...props,
						className: cn('disabled:opacity-100', props?.className),
					}}
				/>
			)}
		</div>
	);
};

export interface TextFieldProps extends InputProps {
	label?: string;
	LabelProps?: LabelProps;
	loading?: boolean;
}
