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
import { ToolUIPart } from 'ai';
import { CodeBlock } from '../ui/ai-elements/code-block';
import { AccountSummary } from './account-summary';
import { ChatActionCard } from './chat-action-card';
import { Weather } from './weather';

export type ToolPart = ToolUIPart;

export interface ToolResultProps extends ToolProps {
	toolPart: ToolPart;
	ToolContentProps?: ToolContentProps;
	ToolHeaderProps?: ToolHeaderProps;
	ToolInputProps?: ToolInputProps;
	ToolOutputProps?: ToolOutputProps;
}

type ToolType = Chat.ToolPart['type'];

const renderByType: Partial<
	Record<ToolType, (part: ToolPart) => React.ReactNode>
> = {
	'tool-getWeather': (part) => {
		const data = getToolOutput<WeatherAtLocationData>(part);
		return <Weather {...{ data, loading: part.state === 'input-available' }} />;
	},
	'tool-pushEnrollment': (part) => {
		const href = getToolOutput<string>(part);
		if (!href) return null;
		return (
			<ChatActionCard
				href={href}
				label='Start Enrollment'
				cta='Click to begin MFA enrollment'
			/>
		);
	},
	'tool-getAccounts': (part) => {
		const accounts = getToolOutput<Accounts.Account[]>(part) ?? [];
		return <AccountSummary {...{ accounts }} />;
	},
	'tool-getUserProfile': (part) => {
		const data = getToolOutput<UserProfile>(part);
		if (!data) return null;
		return <UserProfileCard data={data} />;
	},
	// 'tool-addExternalAccount': (part) => {
	// 	const data = getToolOutput<any>(part);
	// 	return <ConnectionPicker
	// }
};

export const ToolResult = ({
	toolPart,
	ToolContentProps,
	ToolHeaderProps,
	ToolInputProps,
	ToolOutputProps,
	...props
}: ToolResultProps) => {
	if (!toolPart) {
		return null;
	}

	const { input, type } = toolPart;
	const output = toolPart?.output as unknown as Chat.Tools.Response;
	const errorText = output?.error?.message;
	const state = !!errorText ? 'output-error' : toolPart?.state;
	const widget = renderByType[toolPart.type as ToolType]?.(toolPart);

	// Hide certain internal tools
	if (
		['tool-getContent', 'tool-getReferenceFile', 'tool-userSettings'].includes(
			toolPart.type
		)
	) {
		return null;
	}

	return (
		<div className='items-stretch, flex w-full flex-col-reverse gap-3'>
			<Tool {...{ ...props, toolPart }}>
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
			{widget}
		</div>
	);
};

function getToolOutput<T>(part: ToolPart): T | undefined {
	if (part.state !== 'output-available') return undefined;
	const data = (part.output as any)?.data;
	return data as T | undefined;
}
