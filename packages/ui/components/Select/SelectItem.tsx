'use client';

import * as Select from '@radix-ui/react-select';
import { useClassNames } from '../../hooks/useClassNames';
import { CheckIcon } from '@radix-ui/react-icons';

interface Props {
  value: string;
  className?: string;
	disabled?: boolean;
  children: string;
}

export default function SelectItem({ children, className, value, disabled }: Props) {
  const { classNames } = useClassNames();

  return (
    <Select.Item
      className={classNames(
        'text-primary-500 dark:text-primary-50 relative flex h-6 select-none items-center rounded-md p-6 w-full',
        'data-[disabled]:text-primary-300 dark:data-[disabled]:text-slate-400 data-[disabled]:pointer-events-none',
        'data-[highlighted]:bg-primary-500 data-[highlighted]:text-primary-50 data-[highlighted]:outline-none',
        className || ''
      )}
			disabled={disabled}
      value={value}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="dark:text-primary-50 absolute left-0 inline-flex w-6 items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
}
