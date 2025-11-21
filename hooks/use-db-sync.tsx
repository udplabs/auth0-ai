'use client';

import { useEffect, useRef } from 'react';
const SYNC_KEY = 'db:synced';
const SYNC_TTL = 30 * 60 * 1000; // 30m

// Check if database initialization is needed
// Note: No longer syncs remote content - using local SQLite only
function dbNeedsSync(now = Date.now()) {
	try {
		const raw = localStorage.getItem(SYNC_KEY);
		if (!raw) return true;
		const prev = Number(raw);
		if (Number.isNaN(prev)) return true;
		return now - prev > SYNC_TTL;
	} catch {
		return true;
	}
}

async function syncDb() {
	await fetch('/api/me/settings', { method: 'POST' });
	localStorage.setItem(SYNC_KEY, Date.now().toString());
}

export const useDbSync = () => {
	const syncInProgress = useRef(false);

	useEffect(() => {
		if (syncInProgress.current) return;

		if (!dbNeedsSync()) return;

		syncInProgress.current = true;

		if (!window.__dbSyncPromise) {
			window.__dbSyncPromise = (async () => {
				try {
					await syncDb();
				} finally {
					syncInProgress.current = false;
					// Leave the promise cached until resolved (prevents duplicate kicks)
					delete window.__dbSyncPromise;
				}
			})();
		}
		// Fire but ignore errors
		// Just log
		window.__dbSyncPromise.catch((e) => {
			console.info('db sync went wrong... ¯\_(ツ)_/¯');
			console.error(e);
		});
	}, []);
};
