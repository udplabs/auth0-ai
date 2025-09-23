import analyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
	productionBrowserSourceMaps: true,
	images: {
		remotePatterns: [
			{
				hostname: 'avatar.vercel.sh',
			},
		],
	},
	devIndicators: { position: 'bottom-right' },
};

const withBundleAnalyzer = analyzer({
	enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
