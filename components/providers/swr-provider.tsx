'use client';

import { fetcher } from '@/lib/utils';
import { SWRConfig } from 'swr';

export function SWRProvider({ children }: { children: React.ReactNode }) {
	return (
		<SWRConfig
			value={{ refreshInterval: 10 * 60000, fetcher, errorRetryCount: 2 }}
		>
			{children}
		</SWRConfig>
	);
}
