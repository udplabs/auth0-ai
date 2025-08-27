import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'avatar.vercel.sh',
			},
		],
	},
	devIndicators: { position: 'bottom-right' },
};

export default nextConfig;
