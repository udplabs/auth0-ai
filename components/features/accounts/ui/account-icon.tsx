import { cn } from '@/lib/utils';
import {
	BanknoteIcon,
	CarIcon,
	CreditCardIcon,
	DollarSignIcon,
	HouseIcon,
	PiggyBankIcon,
	type LucideProps,
} from 'lucide-react';

import type { Accounts } from '@/types';

export interface AccountIconProps extends LucideProps {
	type?: Accounts.SubTypeOf<'deposit' | 'credit' | 'investment' | 'loan'>;
}

export const AccountIcon = ({
	className,
	type,
	...props
}: AccountIconProps) => {
	const iconProps = {
		...props,
		className: cn(
			'size-10 text-muted-foreground dark:text-foreground',
			className
		),
	};

	switch (type) {
		case 'checking':
			return <BanknoteIcon {...iconProps} />;
		case 'card':
		case 'loc':
			return <CreditCardIcon {...iconProps} />;
		case 'money_market':
		case 'ira':
		case 'certificate':
		case 'savings':
			return <PiggyBankIcon {...iconProps} />;
		case 'mortgage':
		case 'heloc':
			return <HouseIcon {...iconProps} />;
		case 'auto':
			return <CarIcon {...iconProps} />;
		case 'unsecured':
		case 'secured':
			return <DollarSignIcon {...iconProps} />;

		default:
			return null;
	}
};
