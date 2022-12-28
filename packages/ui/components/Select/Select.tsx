'use client';

import * as RadixSelect from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

interface Props {
  ariaLabel: string;
  placeholder: string;
  children: React.ReactNode;
  disabled?: boolean;
  onSelect?: (value: string) => void;
}

export default function Select({ onSelect, ariaLabel, placeholder, disabled, children }: Props) {
  return (
    <RadixSelect.Root name='select-exercise' required onValueChange={onSelect}>
      <RadixSelect.Trigger
        className="w-full text-primary-500 bg-primary-50 hover:bg-secondary-100 inline-flex items-center justify-center gap-2 rounded-md p-2 shadow-md"
        aria-label={ariaLabel}
        disabled={disabled}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="text-primary-500">
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="bg-primary-50 overflow-hidden rounded-md shadow-md">
          <RadixSelect.ScrollUpButton className="bg-primary-50 text-primary-500 flex h-6 cursor-default items-center justify-center">
            <ChevronUpIcon />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="p-1">
            {children}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="bg-primary-50 text-primary-500 flex h-6 cursor-default items-center justify-center">
            <ChevronDownIcon />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
