'use client';

import { useDbSync } from '@/hooks/use-db-sync';

export function Bootstrap() {
	useDbSync();
	return null;
}
