import {
  Input,
  type InputProps,
  Label,
  type LabelProps,
  Skeleton,
} from '@/components/ui';
import { cn } from '@/lib/utils';

export const TextField = ({
  label,
  LabelProps,
  skeleton = false,
  ...props
}: TextFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label
          {...{
            ...LabelProps,
            className: cn('font-light', LabelProps?.className),
          }}
        >
          {label}
        </Label>
      )}
      {skeleton ? (
        <Skeleton className="w-full h-10" />
      ) : (
        <Input
          {...{
            ...props,
            className: cn('disabled:opacity-100', props?.className),
          }}
        />
      )}
    </div>
  );
};

export interface TextFieldProps extends InputProps {
  label?: string;
  LabelProps?: LabelProps;
  skeleton?: boolean;
}
