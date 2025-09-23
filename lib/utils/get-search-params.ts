import type { NextRequest } from 'next/server';

export function getSearchParams<T>(req: NextRequest, keys: string[] = []) {
	console.debug('parsing search params...');

	const result: T = {} as T;

	if (req.nextUrl?.search) {
		const searchParams = new URLSearchParams(req.nextUrl.search);

		keys.forEach((key) => {
			const value = searchParams.get(key);
			if (value !== null) {
				if (value === 'true') {
					(result as any)[key] = true;
				} else if (value === 'false') {
					(result as any)[key] = false;
				} else if (!isNaN(Number.parseInt(value))) {
					(result as any)[key] = parseInt(value);
				} else {
					(result as any)[key] = value;
				}
			}
		});
	}

	return result;
}
