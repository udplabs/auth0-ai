import { cn } from '@/lib/utils/utils';

export interface PromptUserContainerProps {
	title: React.ReactNode;
	description?: React.ReactNode;
	action?: {
		label: string;
		onClick: () => void;
		className?: string;
	};
	icon?: React.ReactNode;
	readOnly?: boolean;
	containerClassName?: string;
}

export function PromptUserContainer({
	title,
	description,
	action,
	icon,
	readOnly = false,
	containerClassName,
}: PromptUserContainerProps) {
	return (
		<fieldset
			className={cn(
				'flex w-full flex-col items-center justify-between gap-4 rounded-lg border border-gray-300 p-4 sm:flex-row sm:gap-2 sm:p-6',
				{ 'disabled cursor-not-allowed': readOnly },
				containerClassName
			)}
			disabled={readOnly}
		>
			<div className='flex w-full flex-col items-center justify-start gap-4 sm:flex-row'>
				{icon}
				<div className='flex w-full flex-col items-start gap-1 sm:gap-1.5'>
					<h2 className='grow text-sm leading-6 font-semibold sm:text-base'>
						{title}
					</h2>
					{description && (
						<p className='grow text-xs leading-5 font-light text-gray-500 sm:text-sm'>
							{description}
						</p>
					)}
				</div>
			</div>

			{action && (
				<div className='w-full sm:w-fit'>
					<button
						onClick={() => action.onClick()}
						className={cn(
							'focus-visible:ring-ring hover:bg-primary/90 w-full rounded-md bg-gray-200 px-4 py-2 text-sm font-normal whitespace-nowrap text-black transition-all duration-300 hover:text-white focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:w-fit',
							action.className
						)}
					>
						{action.label}
					</button>
				</div>
			)}
		</fieldset>
	);
}
