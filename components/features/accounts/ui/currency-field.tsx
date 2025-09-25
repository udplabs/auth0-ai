import { currencyFormatter } from '@/lib/utils';
import type { Accounts } from '@/types/accounts';

export const CurrencyField = ({
	children = '**hidden**',
	currencyCode,
	...props
}: CurrencyProps) => {
	return (
		<span {...props}>
			{typeof children === 'string'
				? children
				: currencyFormatter(children, { currencyCode })}
		</span>
	);
};

export interface CurrencyProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
	currencyCode?: Accounts.Account['currencyCode'];
	children?: number | '**hidden**';
}
