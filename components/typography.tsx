import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
	component?: React.ElementType;
	loading?: boolean;
}

export const Typography = ({
	children,
	component: Component = 'span',
	loading = false,
	...props
}: TypographyProps) => {
	if (loading) {
		return (
			<Skeleton
				className={cn(
					'bg-muted inline-block w-full max-w-xs rounded',
					getDefaultSkeletonHeight(Component),
					props?.className
				)}
			/>
		);
	}
	return (
		<Component {...{ ...props, className: cn(props?.className) }}>
			{children}
		</Component>
	);
};

function getDefaultSkeletonHeight(component: React.ElementType) {
	const heightMap: Record<string, string> = {
		// Body text
		span: 'h-4', // 16px - inline text
		p: 'h-5', // 20px - paragraph text
		div: 'h-5', // 20px - block text

		// Headings
		h1: 'h-10', // 40px - largest heading
		h2: 'h-8', // 32px
		h3: 'h-7', // 28px
		h4: 'h-6', // 24px
		h5: 'h-5', // 20px
		h6: 'h-4', // 16px

		// Common text elements
		label: 'h-4', // 16px - form labels
		small: 'h-3', // 12px - small text
		strong: 'h-4', // 16px - bold text
		em: 'h-4', // 16px - italic text
	};

	return heightMap[component as string] || 'h-5'; // Default to 20px
}
