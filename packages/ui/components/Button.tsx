'use client';

import { classNames } from '../utils';

interface Props {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

export const Button = ({ label, onClick, className }: Props) => {
  return (
    <button
      className={classNames(
        'inline-flex rounded-md bg-slate-400 p-2 shadow',
        className || '',
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
