import type { SettingsModel } from '@/lib/db/generated/prisma/models';

export interface UISettings
	extends Pick<SettingsModel, 'id' | 'currentLabStep'> {
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
