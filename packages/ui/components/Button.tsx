'use client';

import { classNames } from '../utils';

interface Props {
  label: string;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

export const Button = ({ label, disabled, onClick, className }: Props) => {
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
};
