import type { Settings } from '@/lib/db/generated/prisma';
import type { Geo } from '@vercel/functions';

export interface UISettings extends Pick<Settings, 'id' | 'currentLabStep'> {
	createdAt: string;
	updatedAt: string;
	nextLabStep?: string;
	labMeta?: string;
	preferences?: string;
}
export interface UICreateSettingsInput
	extends Partial<Omit<UISettings, 'createdAt' | 'updatedAt'>> {
	id: string;
	createdAt?: string | Date;
	updatedAt?: string | Date;
}
