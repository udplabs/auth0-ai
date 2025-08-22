import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const DEFAULT_DEPLOY_URL = '#';
// const DEFAULT_DEPLOY_URL = `https://vercel.com/new/clone?repository-url=https://github.com/vercel/ai-chatbot&env=AUTH_SECRET&envDescription=Learn more about how to get the API Keys for the application&envLink=https://github.com/vercel/ai-chatbot/blob/main/.env.example&demo-title=AI Chatbot&demo-description=An Open-Source AI Chatbot Template Built With Next.js and the AI SDK by Vercel.&demo-url=https://chat.vercel.ai&products=[{"type":"integration","protocol":"ai","productSlug":"grok","integrationSlug":"xai"},{"type":"integration","protocol":"storage","productSlug":"neon","integrationSlug":"neon"},{"type":"integration","protocol":"storage","productSlug":"upstash-kv","integrationSlug":"upstash"}]`;

export const VercelButton = ({
	className,
	children,
	href = DEFAULT_DEPLOY_URL,
	target = '_noblank',
	...props
}: ButtonProps) => {
	return (
		<Button
			{...{
				...props,
				className: cn(
					'hidden h-fit bg-zinc-900 px-2 py-1.5 text-zinc-50 hover:bg-zinc-800 md:flex md:h-[34px] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200',
					className
				),
				href,
				target,
			}}
		>
			{children || (
				<>
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
					Deploy with Vercel
				</>
			)}
		</Button>
	);
};
