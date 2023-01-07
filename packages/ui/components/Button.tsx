'use client';

import { useClassNames } from '../hooks/useClassNames';

interface Props {
  selected?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children: string;
}

export default function Button({
  selected,
  disabled,
  onClick,
  className,
  children
}: Props) {
  const { classNames } = useClassNames();

  return (
    <button
      className={classNames(
        'group w-full rounded-md bg-primary-500 px-2 py-1 text-center !text-secondary-50 shadow-md outline-secondary-700 duration-500 hover:bg-primary-400 hover:!text-secondary-50 dark:bg-primary-900 dark:hover:bg-primary-800',
        selected ? '!bg:primary-400 dark:!bg-secondary-700' : '',
        disabled
          ? '!bg-primary-200 dark:border dark:border-secondary-900 dark:!bg-transparent'
          : '',
        className || ''
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <strong>{children}</strong>
    </button>
  );
}
