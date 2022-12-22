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
        'inline-flex rounded-md bg-slate-400 p-2 shadow',
        className || '',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
