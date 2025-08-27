'use client';

import { useUserProfile } from '@/hooks/use-user-profile';

import {
	Avatar,
	type AvatarFallbackProps,
	AvatarImage,
	type AvatarImageProps,
	type AvatarProps,
} from '@/components/ui/avatar';
import {
	Card,
	CardContent,
	type CardContentProps,
	CardDescription,
	type CardDescriptionProps,
	CardHeader,
	type CardHeaderProps,
	type CardProps,
	CardTitle,
	type CardTitleProps,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TextField } from '@/components/ui/text-field';
import { cn } from '@/lib/utils';
import { VerifiedBadge } from './verified-badge';

export const UserProfileCard = ({
	AvatarProps,
	AvatarFallbackProps,
	AvatarImageProps,
	CardContentProps,
	CardDescriptionProps,
	CardHeaderProps,
	CardTitleProps,
	...props
}: UserProfileCardProps) => {
	const { data, isLoading: loading } = useUserProfile();

	const {
		nickname,
		name = nickname,
		email,
		picture,
		email_verified,
		given_name,
		family_name,
		user_id,
	} = data || {};

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
						loading,
					}}
				>
					<AvatarImage
						{...{
							...AvatarImageProps,
							className: cn('rounded-full', AvatarImageProps?.className),
							src:
								picture ??
								`https://api.dicebear.com/7.x/thumbs/svg?seed=${
									nickname || 'user'
								}`,
							alt: 'User Profile',
						}}
					/>
				</Avatar>
				<div className='flex w-full flex-col gap-2'>
					<CardTitle {...{ loading, ...CardTitleProps }}>{name}</CardTitle>
					<CardDescription
						{...{
							loading,
							...CardDescriptionProps,
							className: cn('flex gap-2', CardDescriptionProps?.className),
						}}
					>
						{email}
					</CardDescription>
					<VerifiedBadge {...{ loading, verified: email_verified }} />
				</div>
			</CardHeader>
			<CardContent {...CardContentProps}>
				<Separator />
				<div className='grid grid-cols-2 gap-8 pt-8'>
					<div className='auto-rows grid gap-8'>
						<TextField
							readOnly
							{...{ label: 'Nickname', value: nickname, loading }}
						/>
						<TextField
							readOnly
							{...{ label: 'First Name', value: given_name, loading }}
						/>
					</div>
					<div className='auto-rows grid gap-8'>
						<TextField
							readOnly
							{...{ label: 'User ID', value: user_id, loading }}
						/>
						<TextField
							readOnly
							{...{ label: 'Last Name', value: family_name, loading }}
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
	data?: UserProfile;
}
