import type { Auth0InterruptionUI } from '@auth0/ai-vercel/react';
import { FederatedConnectionInterrupt } from '@auth0/ai/interrupts';

import { EnsureAPIAccess } from '@/components/auth0-ai/FederatedConnections';

interface FederatedConnectionInterruptHandlerProps {
	interrupt: Auth0InterruptionUI | null;
}

export function FederatedConnectionInterruptHandler({
	interrupt,
}: FederatedConnectionInterruptHandlerProps) {
	if (!FederatedConnectionInterrupt.isInterrupt(interrupt)) {
		return null;
	}

	return (
		<div
			key={interrupt.name}
			className='whitespace-pre-wrap'
		>
			<EnsureAPIAccess
				mode='popup'
				interrupt={interrupt}
				connectWidget={{
					title: 'Authorization required.',
					description: interrupt.message,
					action: { label: 'Authorize' },
				}}
			/>
		</div>
	);
}
