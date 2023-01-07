'use client';

import { useClassNames } from '../hooks/useClassNames';

interface Props {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

export default function Button({
  label,
  selected,
  disabled,
  onClick,
  className
}: Props) {
  const { classNames } = useClassNames();

  return (
    <button
      className={classNames(
        'hover:bg-primary-400 dark:hover:bg-primary-800 bg-primary-500 dark:bg-primary-900 !text-secondary-50 outline-secondary-700 group w-full rounded-md px-2 py-1 text-center shadow-md duration-500',
        selected ? '!bg-secondary-500 hover:!text-secondary-500' : '',
        disabled
          ? '!bg-primary-200 dark:border-secondary-900 dark:border dark:!bg-transparent'
          : '',
        className || ''
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <strong>{label}</strong>
    </button>
  );
}
