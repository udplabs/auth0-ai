'use client';

import { useCallback, useEffect, useState } from 'react';

import { Loader } from '@/components/ui/ai-elements/loader';
import { PromptUserContainer } from '../util/prompt-user-container';
import type { FederatedConnectionAuthProps } from './FederatedConnectionAuthProps';

export function EnsureAPIAccessPopup({
	interrupt: { connection, requiredScopes, resume },
	connectWidget: { icon, title, description, action, containerClassName },
	auth: { authorizePath = '/auth/login', returnTo = '/close' } = {},
	onFinish,
}: FederatedConnectionAuthProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [loginPopup, setLoginPopup] = useState<Window | null>(null);
	// Fire completion exactly once
	const [completed, setCompleted] = useState(false);

	const complete = useCallback(async () => {
		if (completed) return;
		console.log('Completing API access...');
		setCompleted(true);
		setIsLoading(false);
		setLoginPopup(null);
		if (typeof onFinish === 'function') {
			onFinish();
		} else if (typeof resume === 'function') {
			try {
				await resume();
			} catch (e) {
				console.error('resume failed', e);
			}
		}
	}, [completed, onFinish, resume]);

	// Prefer postMessage; fallback to polling
	useEffect(() => {
		function onMessage(e: MessageEvent) {
			console.log('Received message:', e.data);
			if (e.origin !== window.location.origin) return;
			if (!e.data || e.data.type !== 'auth0-fedconn-complete') return;
			// Close popup if still open
			try {
				console.log('attempting to close popup...');
				if (loginPopup && !loginPopup.closed) loginPopup.close();
			} catch {}
			void complete();
		}
		window.addEventListener('message', onMessage);
		return () => window.removeEventListener('message', onMessage);
	}, [loginPopup, complete]);

	// Fallback to polling
	useEffect(() => {
		if (!loginPopup || completed) return;
		const interval = setInterval(async () => {
			if (loginPopup.closed) {
				clearInterval(interval);
				await complete();
			}
		}, 500);
		return () => clearInterval(interval);
	}, [loginPopup, completed, complete]);

	//Open the login popup
	const startLoginPopup = useCallback(async () => {
		const search = new URLSearchParams({
			returnTo,
			connection,
			access_type: 'offline',
			prompt: 'consent',
			connection_scope: requiredScopes.join(' '),
		});

		const url = new URL(authorizePath, window.location.origin);
		url.search = search.toString();

		console.log('url:', url.toString());

		const popupWidth = screen.height;
		const popupHeight = 800;

		const windowFeatures = `width=${popupWidth.toString()},height=${popupHeight.toString()},status=no,toolbar=no,menubar=no,resizable=yes,top=${(screen.height - popupHeight) / 4},left=${(screen.width - popupWidth) / 2}`;

		const popup = window.open(url.toString(), '_blank', windowFeatures);
		if (!popup) {
			console.error('Popup blocked by the browser');
			return;
		} else {
			setLoginPopup(popup);
			setIsLoading(true);
		}
	}, [connection, requiredScopes, returnTo, authorizePath]);

	if (isLoading) {
		return (
			<span>
				<Loader /> Waiting for you to complete authentication...
			</span>
		);
	}

	return (
		<PromptUserContainer
			title={title}
			description={description}
			icon={icon}
			containerClassName={containerClassName}
			action={{
				label: action?.label ?? 'Connect',
				onClick: startLoginPopup,
			}}
		/>
	);
}
