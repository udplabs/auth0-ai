import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export { ulid } from 'ulid';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Implementing our own sortBy to improve app performance when developing locally.
// Local development requires reloading over and over.
// Loading lodash-es is heavier than you'd think and lengthens compile time.
export function sortBy<T, K extends keyof T>(
	array: readonly T[],
	key: K,
	order: 'asc' | 'desc' = 'asc'
) {
	const dir = order === 'asc' ? 1 : -1;
	return [...array].toSorted((a: T, b: T) => {
		const av = a[key] as any;
		const bv = b[key] as any;

		// Always push nullish to the end (independent of order)
		if (av == null && bv == null) return 0;
		if (av == null) return 1;
		if (bv == null) return -1;

		const compare = av < bv ? -1 : av > bv ? 1 : 0;
		return compare * dir;
	});
}

interface CurrencyFormatterOptions {
	currencyCode?: string;
	locale?: Intl.LocalesArgument;
	minimumFractionDigits?: Intl.NumberFormatOptions['minimumFractionDigits'];
}

export function currencyFormatter(
	amount: number | string,
	options?: CurrencyFormatterOptions
) {
	const {
		currencyCode: currency = 'USD',
		locale = 'en-US',
		minimumFractionDigits = 2,
	} = options || {};

	const formatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		minimumFractionDigits,
	}).format;

	if (typeof amount === 'number') {
		return formatter(amount);
	}

	const parsed = parseFloat(amount);

	if (!isNaN(parsed)) {
		return formatter(parsed);
	}
}
