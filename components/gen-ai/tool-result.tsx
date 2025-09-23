import { UserProfileCard } from '@/components/features/user-profile/user-profile-card';
import {
	Tool,
	ToolContent,
	ToolHeader,
	ToolInput,
	ToolOutput,
	type ToolContentProps,
	type ToolHeaderProps,
	type ToolInputProps,
	type ToolOutputProps,
	type ToolProps,
} from '@/components/ui/ai-elements/tool';
import { useDataStream } from '@/hooks/use-data-stream';
import type { UserProfile } from '@/hooks/use-user-profile';
import { hasPushMfa, mfaEnrollPending, transferInterrupt } from '@/lib/signals';
import type { Accounts } from '@/types/accounts';
import type { Chat } from '@/types/chat';
import type { Transactions } from '@/types/transactions';
import type { Transfers } from '@/types/transfers';
import { UserDoesNotHavePushNotificationsInterrupt } from '@auth0/ai/interrupts';
import { useSignals } from '@preact/signals-react/runtime';
import { ToolUIPart } from 'ai';
import { TransactionsList } from '../features/accounts/transactions-list';
import type { DataStream } from '../providers/data-stream-provider';
import { CodeBlock } from '../ui/ai-elements/code-block';
import { AccountSummary } from './account-summary';
import { MfaEnrollmentCard } from './mfa-enrollment-card';
import { Weather, type WeatherAtLocationData } from './weather';

export type ToolPart = ToolUIPart;

export interface ToolResultProps extends ToolProps {
	toolPart: ToolPart;
	parts?: Chat.MessagePart[];
	ToolContentProps?: ToolContentProps;
	ToolHeaderProps?: ToolHeaderProps;
	ToolInputProps?: ToolInputProps;
	ToolOutputProps?: ToolOutputProps;
}

type ToolType = Chat.ToolPart['type'];

type RenderByTypeProps = {
	toolPart: ToolPart;
	parts: Chat.MessagePart[];
	dataStream?: DataStream;
};

export const ToolResult = ({
	toolPart,
	parts = [],
	ToolContentProps,
	ToolHeaderProps,
	ToolInputProps,
	ToolOutputProps,
	...props
}: ToolResultProps) => {
	useSignals();
	const { dataStream } = useDataStream();

	if (!toolPart) {
		return null;
	}
	const renderByType: Partial<
		Record<ToolType, (options: RenderByTypeProps) => React.ReactNode>
	> = {
		'tool-getWeather': ({ toolPart }) => {
			const { data } = getToolOutput<WeatherAtLocationData>(toolPart);
			return (
				<Weather {...{ data, loading: toolPart.state === 'input-available' }} />
			);
		},
		'tool-enrollMfaPush': ({ toolPart }) => {
			const { data: href } = getToolOutput<string>(toolPart);

			if (!href) return null;

			return <MfaEnrollmentCard {...{ href }} />;
		},
		'tool-getAccounts': ({ toolPart, dataStream = [] }) => {
			// This should always be empty
			const { data: accounts = [] } =
				getToolOutput<Accounts.Account[]>(toolPart);

			if (accounts.length === 0 && dataStream.length > 0) {
				const stream = dataStream.find((s) => s.id === toolPart.toolCallId);

				if (stream) {
					return (
						<AccountSummary
							accounts={(stream?.data as Accounts.Account[]) || []}
						/>
					);
				}
			}

			return <AccountSummary {...{ accounts }} />;
		},
		'tool-getTransactions': ({ toolPart, dataStream = [] }) => {
			// This should always be empty
			const { data: transactions = [] } =
				getToolOutput<Transactions.Transaction[]>(toolPart);

			if (transactions.length === 0 && dataStream.length > 0) {
				const stream = dataStream.find((s) => s.id === toolPart.toolCallId);

				if (stream) {
					return (
						<TransactionsList
							{...{ transactions: stream?.data as Transactions.Transaction[] }}
						/>
					);
				}
			}

			return <TransactionsList {...{ transactions }} />;
		},
		'tool-getUserProfile': ({ toolPart }) => {
			const { data } = getToolOutput<UserProfile>(toolPart);
			if (!data) return null;
			return <UserProfileCard data={data} />;
		},
		'tool-transferFunds': ({ toolPart }) => {
			const { status, error } = getToolOutput<string>(toolPart) || {};
			const input = getToolInput<Transfers.CreateTransferInput | undefined>(
				toolPart
			);

			if (
				status === 'error' &&
				error?.code === UserDoesNotHavePushNotificationsInterrupt.code &&
				!mfaEnrollPending.value &&
				!hasPushMfa.value
			) {
				mfaEnrollPending.value = true;
				transferInterrupt.value = input ?? null;
			}
			return <></>;
		},
	};

	const { input, type } = toolPart;
	const output = toolPart?.output as unknown as Chat.ToolsResponse;
	const errorText = output?.error?.message;
	const state = !!errorText ? 'output-error' : toolPart?.state;
	const widget = renderByType[toolPart.type as ToolType]?.({
		toolPart,
		parts,
		dataStream,
	});

	// Hide certain internal tools
	// if (['tool-getContent', 'tool-userSettings'].includes(toolPart.type)) {
	// 	return null;
	// }

	return (
		<div className='items-stretch, flex w-full flex-col-reverse gap-3'>
			{widget}
			<Tool {...props}>
				<ToolHeader {...{ ...ToolHeaderProps, type, state }} />
				<ToolContent {...ToolContentProps}>
					<ToolInput {...{ ...ToolInputProps, input }} />
					{(!!output || !!errorText) && (
						<ToolOutput
							{...{
								...ToolOutputProps,
								errorText,
								output: (
									<CodeBlock
										code={
											typeof output === 'string'
												? output
												: JSON.stringify(output, null, 2)
										}
										language='json'
									/>
								),
							}}
						/>
					)}
				</ToolContent>
			</Tool>
		</div>
	);
};

function getToolOutput<T>(part: ToolPart): Chat.ToolsResponse<T> {
	if (part.state !== 'output-available') return { dataCount: 0 };
	return part.output as Chat.ToolsResponse<T>;
}
function getToolInput<T>(part: ToolPart): T {
	return part?.input as T;
}
