import {
  Button,
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  type CardProps,
  type CardDescriptionProps,
  type CardHeaderProps,
  type CardTitleProps,
} from '@/components/ui';
import { VerifiedBadge } from '@/components';
import {
  FaFingerprint as BiometricIcon,
  FaEnvelope as EmailIcon,
  FaEllipsisH as PinIcon,
  FaSms as SmsIcon,
} from 'react-icons/fa';
import {
  TbShieldLock as MfaIcon,
  TbFaceId as PasskeyIcon,
  TbPassword as PasswordIcon,
  TbDeviceMobileUp as PushIcon,
  TbSos as RecoveryIcon,
  TbBinary as TotpIcon,
} from 'react-icons/tb';

import { cn } from '@/lib/utils';

import type { IconType } from 'react-icons/lib';

export const Authenticator = ({
  CardDescriptionProps,
  CardHeaderProps,
  CardTitleProps,
  data,
  loading = false,
  skeleton = false,
  onDelete,
  ...props
}: AuthenticatorProps) => {
  const { id, enrolled, type: factorType } = data || {};
  const {
    primary,
    secondary,
    icon: Icon = MfaIcon,
  } = factorMapping[factorType as FactorType] || {};

  if (!enrolled) {
    return null;
  }

  return (
    <Card
      {...{
        ...props,
        className: cn(
          'w-full dark:bg-gray-700 border border-gray-600 shadow-inner',
          props?.className,
        ),
      }}
    >
      <CardHeader {...CardHeaderProps}>
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-400 text-white dark:bg-gray-800">
            <Icon className="h-auto w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <CardTitle {...{ skeleton, ...CardTitleProps }}>
                {primary}
              </CardTitle>
            </div>
            <CardDescription
              {...{
                skeleton,
                ...CardDescriptionProps,
                className: cn(
                  'italic dark:text-gray-300 mt-1',
                  CardDescriptionProps?.className,
                ),
              }}
            >
              {secondary}
            </CardDescription>
          </div>

          {!skeleton && (
            <VerifiedBadge label="Enrolled" verified className="ms-8" />
          )}
        </div>
        {!skeleton && id && (
          <CardAction>
            <Button
              {...{
                className: 'min-2-24',
                loading,
                onClick: () => onDelete?.(id),
                variant: 'destructive',
              }}
            >
              Remove
            </Button>
          </CardAction>
        )}
      </CardHeader>
    </Card>
  );
};

const factorMapping: Record<FactorType, FactorDisplay> = {
  sms: {
    primary: 'SMS',
    secondary: 'Receive a one-time code via message.',
    icon: SmsIcon,
  },
  email: {
    primary: 'Email',
    secondary: 'Receive a magic link via email.',
    icon: EmailIcon,
  },
  'recovery-code': {
    primary: 'Recovery Code',
    secondary: 'A unique code.',
    icon: RecoveryIcon,
  },
  push: {
    primary: 'Push Notification',
    secondary: 'Receive notifications directly in the mobile App.',
    icon: PushIcon,
  },
  'webauthn-platform': {
    primary: 'Biometrics',
    secondary: 'i.e. Face ID, Touch ID, Samsung Pass, Windows Hello, etc.',
    icon: BiometricIcon,
  },
  'webauthn-roaming': {
    primary: 'Security Key',
    secondary: 'WebAuthn-compliant security key (i.e. FIDO2).',
    icon: TotpIcon,
  },
  totp: {
    primary: 'One-time Password',
    secondary:
      'A one-time code provided by applications like Google Authenticator or Okta Verify.',
    icon: PinIcon,
  },
  passkey: {
    primary: 'Passkey',
    secondary:
      'Phishing resistant alternative to more traditional methods (i.e. passwords)',
    icon: PasskeyIcon,
  },
  phone: {},
  password: {
    primary: 'Password',
    icon: PasswordIcon,
  },
};

export interface AuthenticatorProps extends CardProps {
  data?: Factor;
  loading?: boolean;
  CardDescriptionProps?: CardDescriptionProps;
  CardHeaderProps?: CardHeaderProps;
  CardTitleProps?: CardTitleProps;
  onDelete?: (params: string) => Promise<void>;
  skeleton?: boolean;
}
export interface FactorDisplay {
  primary?: string;
  secondary?: string;
  icon?: IconType;
}
