import { cn } from '@/lib/utils/utils';
import { AnimatedButton, AnimatedButtonProps } from './animated-button';
const DEFAULT_DEPLOY_URL = '#';
// const DEFAULT_DEPLOY_URL = `https://vercel.com/new/clone?repository-url=https://github.com/vercel/ai-chatbot&env=AUTH_SECRET&envDescription=Learn more about how to get the API Keys for the application&envLink=https://github.com/vercel/ai-chatbot/blob/main/.env.example&demo-title=AI Chatbot&demo-description=An Open-Source AI Chatbot Template Built With Next.js and the AI SDK by Vercel.&demo-url=https://chat.vercel.ai&products=[{"type":"integration","protocol":"ai","productSlug":"grok","integrationSlug":"xai"},{"type":"integration","protocol":"storage","productSlug":"neon","integrationSlug":"neon"},{"type":"integration","protocol":"storage","productSlug":"upstash-kv","integrationSlug":"upstash"}]`;

const VercelIcon = () => (
	<svg
		height={16}
		strokeLinejoin='round'
		viewBox='0 0 16 16'
		width={16}
		style={{ color: 'currentcolor' }}
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M8 1L16 15H0L8 1Z'
			fill='currentColor'
		/>
	</svg>
);

export interface VercelButtonProps
	extends Omit<AnimatedButtonProps, 'icon' | 'label'> {
	label?: string;
	icon?: React.ReactNode;
}

export const VercelButton = ({
	className,
	icon = <VercelIcon />,
	href = DEFAULT_DEPLOY_URL,
	target = '_noblank',
	label = 'Deploy with Vercel',
	...props
}: VercelButtonProps) => {
	return (
		<AnimatedButton
			{...{
				variant: 'default',
				...props,
				className,
				icon,
				href,
				target,
				label,
			}}
		/>
	);
};
