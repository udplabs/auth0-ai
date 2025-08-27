export const DateField = ({
	format = 'local-date',
	children,
	...props
}: DateProps) => {
	if (!children) {
		return null;
	}

	const date = new Date(children);
	let formatted = '';

	switch (format) {
		case 'local-date':
			formatted = date.toLocaleDateString();
			break;
		case 'local-time':
			formatted = date.toLocaleTimeString();
			break;
		case 'iso':
			formatted = date.toISOString();
			break;
		case 'utc':
			formatted = date.toUTCString();
			break;
		case 'time':
			formatted = date.toTimeString();
			break;
		case 'date':
		default:
			formatted = date.toDateString();
			break;
	}

	return <span {...props}>{formatted}</span>;
};

export interface DateProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
	format?: 'local-date' | 'local-time' | 'iso' | 'utc' | 'date' | 'time';
	children?: number | string;
}
