'use client';

import { Switch as HeadlessSwitch } from '@headlessui/react';
import { useClassNames } from '../hooks/useClassNames';

interface Props {
  name: string;
  isEnabled?: boolean;
  screenReaderText?: string;
  onChange: (isEnabled: boolean) => void;
}

export default function Switch({ name, isEnabled, screenReaderText, onChange }: Props) {
  const { classNames } = useClassNames();

  return (
    <HeadlessSwitch
      name={name}
      checked={isEnabled}
      onChange={onChange}
      className={classNames(
        `relative inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`,
        isEnabled ? 'bg-secondary-500' : 'bg-slate-400 dark:bg-slate-600'
      )}
    >
      <span className="sr-only">{screenReaderText || 'Use setting'}</span>
      <span
        aria-hidden="true"
        className={classNames(
          `pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`,
          isEnabled ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </HeadlessSwitch>
  );
}
