export const CurrencyField = ({
	children = 0,
	currencyCode = 'USD',
	...props
}: CurrencyProps) => {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currencyCode,
		minimumFractionDigits: 2,
	}).format;

	return <span {...props}>{formatter(children)}</span>;
};

export interface CurrencyProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
	currencyCode?: Accounts.Account['currencyCode'];
	children?: number;
}
