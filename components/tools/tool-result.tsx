import { AccountSummaryCard } from '@/components/accounts/account-summary-card';
import { ChatActionCard } from '@/components/tools/chat-action-card';
import { ConnectionPicker } from '@/components/tools/connection-picker';
import { Weather } from '@/components/tools/weather';
import {
	Tool as ToolWidget,
	type ToolPart as _ToolPart,
} from '@/components/ui/tool';
import { UserProfileCard } from '@/components/user-profile/user-profile-card';

interface ToolResultProps
	extends Omit<React.ComponentProps<typeof ToolWidget>, 'toolPart'> {
	toolPart?: Chat.ToolPart;
}

export const ToolResult = ({ toolPart, ...props }: ToolResultProps) => {
	if (!toolPart) {
		return null;
	}

	const { toolCallId, state, output, type } = toolPart;

	const key = `${type}-${toolCallId}`;
	const hasInput = state === 'input-available';
	const hasOutput = state === 'output-available';
	const hasError = state === 'output-error';

	const Wrapper = [
		<ToolWidget
			key={`tool-widget-${key}`}
			{...{ ...props, toolPart: toolPart as _ToolPart }}
		/>,
	];

	switch (type) {
		case 'tool-getWeather':
			const weatherData = output?.data as WeatherAtLocationData | undefined;
			Wrapper.push(
				<div
					key={key}
					className={hasInput ? 'skeleton' : ''}
				>
					<Weather {...{ data: weatherData }} />
				</div>
			);
			break;
		case 'tool-pushEnrollment':
			if (hasOutput) {
				Wrapper.push(
					<ChatActionCard
						key={key}
						{...{
							href: output?.data,
							label: 'Start Enrollment',
							cta: 'Click to begin MFA enrollment',
						}}
					/>
				);
			}
			break;
		case 'tool-getAccounts':
			const accountData: Accounts.Account[] = output?.data || [];
			if (hasOutput) {
				Wrapper.push(
					<div
						key={key}
						className='flex w-full flex-wrap gap-4'
					>
						{accountData?.length ? (
							accountData.map((account) => (
								<AccountSummaryCard
									key={account.id}
									className='w-[48%]'
									{...{ account }}
								/>
							))
						) : (
							<p className='text-muted-foreground'>No accounts found.</p>
						)}
					</div>
				);
			}
			break;
		case 'tool-userInfo':
			if (hasOutput) {
				Wrapper.push(
					<UserProfileCard
						key={key}
						data={output?.data}
					/>
				);
			}
			break;
		// case 'tool-addExternalAccount':
		// 	if (output?.data && output?.data.length > 0) {
		// 		Wrapper.push(
		// 			<ConnectionPicker
		// 				key={key}
		// 				connections={output.data}
		// 			/>
		// 		);
		// 		break;
		// 	}
		// case 'tool-getTransactions':
	}

	return <>{Wrapper}</>;
};
