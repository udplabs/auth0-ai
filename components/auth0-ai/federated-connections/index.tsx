import { useIsMobile } from '@/hooks/use-mobile';

import type { FederatedConnectionAuthProps } from './federated-connection-auth-props';
import { EnsureAPIAccessPopup } from './popup';
import { EnsureAPIAccessRedirect } from './redirect';

export function EnsureAPIAccess(props: FederatedConnectionAuthProps) {
	const { mode } = props;
	const isMobile = useIsMobile();

	switch (mode) {
		case 'popup':
			return <EnsureAPIAccessPopup {...props} />;
		case 'redirect':
			return <EnsureAPIAccessRedirect {...props} />;
		case 'auto':
		default:
			if (isMobile) {
				return <EnsureAPIAccessRedirect {...props} />;
			}
			return <EnsureAPIAccessPopup {...props} />;
	}
}
