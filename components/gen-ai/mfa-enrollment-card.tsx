import { useAuthenticators } from '@/hooks/use-authenticators';
import { useChat } from '@/hooks/use-chat';
import { mfaEnrollPending, transferInterrupt } from '@/lib/signals';
import { useState } from 'react';

import { useSignals } from '@preact/signals-react/runtime';

import { ChatActionCard, type ChatActionCardProps } from './chat-action-card';

type MfaEnrollmentCardProps = Partial<ChatActionCardProps>;

export const MfaEnrollmentCard = ({
	label = 'Start Enrollment',
	cta = 'Click to begin MFA enrollment',
	href,
	...props
}: MfaEnrollmentCardProps) => {
	useSignals();
	useAuthenticators();
	const { id, sendMessage } = useChat();
	const [loading, setLoading] = useState(false);

	if (!mfaEnrollPending.value && !transferInterrupt.value) return null;

	if (transferInterrupt.value) {
		if (mfaEnrollPending.value) {
			return (
				<ChatActionCard
					{...{
						label,
						...props,
						cta: 'To complete your transfer, please enroll in MFA.',
						href,
					}}
				/>
			);
		} else {
			return (
				<ChatActionCard
					{...{
						label: 'Continue Transfer',
						...props,
						cta: 'Successfully Enrolled! Click to complete your transfer.',
						loading,
						onClick: () => {
							setLoading(true);
							// 1) Set static value
							const data = transferInterrupt.value!;
							// 2) Clear signal to also clear banner
							transferInterrupt.value = null;
							// 3) Send message
							sendMessage({
								text: 'Retry transfer',
								metadata: {
									chatId: id,
									isHidden: true,
									interrupt: {
										type: 'transferFunds',
										data,
									},
								},
							});
						},
					}}
				/>
			);
		}
	}

	return (
		<ChatActionCard
			{...{
				label,
				...props,
				cta,
				href,
			}}
		/>
	);
};
