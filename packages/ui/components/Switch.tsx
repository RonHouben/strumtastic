'use client';

import { useState } from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { useClassNames } from '../hooks/useClassNames';

interface Props {
  id: string;
  isEnabled?: boolean;
  screenReaderText?: string;
}

export default function Switch({ id, isEnabled, screenReaderText }: Props) {
  const { classNames } = useClassNames();
  const [enabled, setEnabled] = useState(isEnabled);

  return (
    <HeadlessSwitch
      id={id}
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        `relative inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`,
        enabled ? 'bg-secondary-500' : 'bg-primary-900'
      )}
    >
      <span className="sr-only">{screenReaderText || 'Use setting'}</span>
      <span
        aria-hidden="true"
        className={classNames(
          `pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`,
          enabled ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </HeadlessSwitch>
  );
}
