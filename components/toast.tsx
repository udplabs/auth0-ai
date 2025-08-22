'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
	CircleCheckIcon,
	CircleXIcon,
	InfoIcon,
	TriangleAlert as WarningIcon,
	XIcon,
} from 'lucide-react';
import React from 'react';
import { toast as sonnerToast, ToastT } from 'sonner';
import { CodeBlock } from './code-block';
import { Button } from './ui/button';
import { Loader } from './ui/loader';

type ToastTypes = Required<ToastT>['type'];

const iconsByType: Record<ToastTypes, React.ReactNode> = {
	normal: null,
	action: null,
	success: <CircleCheckIcon className='text-green-800' />,
	info: <InfoIcon className='text-blue-800' />,
	warning: <WarningIcon className='text-yellow-900' />,
	error: <CircleXIcon className='text-red-800' />,
	loading: <Loader />,
	default: null,
};

export function toast(options: ToastOptions) {
	return sonnerToast.custom((id) => <Toast {...{ id, ...options }} />, options);
}

export function Toast({
	action,
	data,
	id,
	description,
	title,
	type = 'default',
	onDismiss,
}: ToastProps) {
	return (
		<Alert className='flex min-w-[364px] flex-col gap-6 md:max-w-[364px]'>
			<div className='flex w-full items-center justify-between gap-4'>
				{iconsByType[type] && (
					<div
						className={`flex h-5 w-5 items-center justify-center rounded-full`}
					>
						{iconsByType[type]}
					</div>
				)}
				<div className='flex flex-2 flex-col'>
					{title && typeof title === 'string' && (
						<AlertTitle>{title}</AlertTitle>
					)}
					{description && <AlertDescription>{description}</AlertDescription>}
				</div>
				<div className='flex flex-1 p-0'>{action}</div>
				<Button
					className='bg-primary text-secondary absolute top-[-8px] right-[-8px] !h-5 !w-5 rounded-full p-0 text-xs'
					onClick={() => {
						sonnerToast.dismiss(id);

						onDismiss?.();
					}}
				>
					<XIcon />
				</Button>
			</div>
			{data && (
				<div className='w-full'>
					<CodeBlock>{data}</CodeBlock>
				</div>
			)}
		</Alert>
	);
}

interface ToastOptions extends Omit<ToastT, 'id' | 'action' | 'onDismiss'> {
	action?: React.ReactNode;
	description?: React.ReactNode;
	data?: string;
	onDismiss?: () => void;
}
interface ToastProps extends ToastOptions {
	id?: string | number;
	type?: ToastTypes;
}
