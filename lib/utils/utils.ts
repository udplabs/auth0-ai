import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function sortBy<T, K extends keyof T>(array: readonly T[], key: K) {
	return [...array].toSorted((a: T, b: T) => {
		const av = a[key] as any;
		const bv = b[key] as any;

		if (av == null && bv == null) return 0;
		if (av == null) return 1;
		if (bv == null) return -1;
		return av < bv ? -1 : av > bv ? 1 : 0;
	});
}
