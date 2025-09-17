import type { Accounts } from '@/types/accounts';

export const CurrencyField = ({
	children = '**hidden**',
	currencyCode = 'USD',
	...props
}: CurrencyProps) => {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currencyCode,
		minimumFractionDigits: 2,
	}).format;

	return (
		<span {...props}>
			{typeof children === 'string' ? children : formatter(children)}
		</span>
	);
};

export interface CurrencyProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
	currencyCode?: Accounts.Account['currencyCode'];
	children?: number | '**hidden**';
}
