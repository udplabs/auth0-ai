'use client';

import { use } from 'react';
import { AvatarFallback } from '@radix-ui/react-avatar';

import { TextField } from '@/components/text-field';
import { VerifiedBadge } from '@/components/verified-badge';
import {
  Avatar,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  type AvatarFallbackProps,
  type AvatarImageProps,
  type AvatarProps,
  type CardProps,
  type CardContentProps,
  type CardDescriptionProps,
  type CardHeaderProps,
  type CardTitleProps,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import type { User } from '@/lib/auth0';

export const UserProfileCard = ({
  AvatarProps,
  AvatarFallbackProps,
  AvatarImageProps,
  CardContentProps,
  CardDescriptionProps,
  CardHeaderProps,
  CardTitleProps,
  skeleton = false,
  user,
  ...props
}: UserProfileCardProps) => {
  const userData = use(user);

  const {
    nickname,
    name = nickname,
    email,
    picture,
    email_verified,
    given_name,
    family_name,
  } = userData || {};

  return (
    <Card {...props}>
      <CardHeader
        {...{
          ...CardHeaderProps,
          className: cn('flex gap-6', CardHeaderProps?.className),
        }}
      >
        <Avatar
          {...{
            ...AvatarProps,
            className: cn('size-20', AvatarProps?.className),
            skeleton,
          }}
        >
          <AvatarImage
            {...{
              ...AvatarImageProps,
              className: cn('rounded-full', AvatarImageProps?.className),
              src: picture,
              alt: 'User Profile',
            }}
          />
          <AvatarFallback
            {...{
              ...AvatarFallbackProps,
              className: cn('rounded-full', AvatarFallbackProps?.className),
            }}
          >{`https://api.dicebear.com/7.x/thumbs/svg?seed=${
            nickname || 'user'
          }`}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2 w-full">
          <CardTitle {...{ skeleton, ...CardTitleProps }}>{name}</CardTitle>
          <CardDescription
            {...{
              skeleton,
              ...CardDescriptionProps,
              className: cn('flex gap-2', CardDescriptionProps?.className),
            }}
          >
            {email}
          </CardDescription>
          <VerifiedBadge {...{ skeleton, verified: email_verified }} />
        </div>
      </CardHeader>
      <CardContent {...CardContentProps}>
        <Separator />
        <div className="grid grid-cols-2 gap-8 pt-8">
          <div className="auto-rows grid gap-8">
            <TextField
              readOnly
              {...{ label: 'Nickname', value: nickname, skeleton }}
            />
            <TextField
              readOnly
              {...{ label: 'First Name', value: given_name, skeleton }}
            />
          </div>
          <div className="auto-rows grid gap-8">
            <TextField
              readOnly
              {...{ label: 'User ID', value: userData?.sub, skeleton }}
            />
            <TextField
              readOnly
              {...{ label: 'Last Name', value: family_name, skeleton }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export interface UserProfileCardProps extends CardProps {
  AvatarProps?: AvatarProps;
  AvatarFallbackProps?: AvatarFallbackProps;
  AvatarImageProps?: AvatarImageProps;
  CardContentProps?: CardContentProps;
  CardDescriptionProps?: CardDescriptionProps;
  CardHeaderProps?: CardHeaderProps;
  CardTitleProps?: CardTitleProps;
  skeleton?: boolean;
  user: Promise<User | undefined>;
}
