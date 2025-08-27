'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { useCallback, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/prompt-kit/loader';

export default function PopupClosePage() {
	const { open, setOpen } = useSidebar();

	if (open) setOpen(false);

	const handleClose = useCallback(() => {
		if (typeof window !== 'undefined') {
			try {
				window.close();
			} catch (err) {
				console.error(err);
			}
		}
	}, []);

	useEffect(() => {
		let timeout = null;

		try {
			const params = new URLSearchParams(window.location.search);
			const payload = {
				type: 'auth0-fedconn-complete',
				connection: params.get('connection') ?? null,
				ok: true,
			};

			if (window.opener && typeof window.opener.postMessage === 'function') {
				window.opener.postMessage(payload, window.location.origin);
			}
		} finally {
			try {
				window.close();
			} catch {}
			timeout = setTimeout(() => {
				window.location.replace('/');
			}, 1500);
		}

		if (timeout) return () => clearTimeout(timeout);
	}, []);

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100'>
			<Loader
				size='lg'
				className='border-primary border-t-secondary h-25 w-25 border-4'
			/>
			<Button
				variant='outline'
				onClick={handleClose}
			>
				Close Window
			</Button>
		</div>
	);
}
