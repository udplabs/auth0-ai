import type { SettingsModel } from '@/lib/db/drizzle/sql/schema';

export interface UISettings extends Pick<SettingsModel, 'id'> {
	createdAt: string;
	updatedAt: string;
	/**
	 * @deprecated
	 */
	nextLabStep?: string;
	/**
	 * @deprecated use currentModule instead
	 */
	currentLabStep?: string;
	labMeta?: string;
	preferences?: string;
	currentModule?: number;
	currentTask?: number;
	currentStep?: number;
}
export interface UICreateSettingsInput
	extends Partial<Omit<UISettings, 'createdAt' | 'updatedAt'>> {
	id: string;
	createdAt?: string;
	updatedAt?: string;
}
