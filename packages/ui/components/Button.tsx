'use client';

import { useClassNames } from '../hooks/useClassNames';

interface Props {
  label: string;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

export default function Button({ label, disabled, onClick, className }: Props) {
  const { classNames } = useClassNames();

  return (
    <button
      className={classNames(
        disabled ? 'bg-transparent' : '',
        'prose w-full rounded-md bg-blue-500 p-2 text-center shadow-md hover:bg-blue-400',
        className || ''
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
