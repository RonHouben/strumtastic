'use client';

import { useClassNames } from '../hooks/useClassNames';
import { Typography } from './Typography';

interface Props {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
        'hover:bg-secondary-400 bg-secondary-500 !text-secondary-50 outline-secondary-700 group w-full rounded-md px-2 py-1 text-center shadow-md duration-500',
        selected ? '!bg-secondary-500 hover:!text-secondary-500' : '',
        disabled ? '!bg-secondary-200' : '',
        className || ''
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Typography
        variant="button"
        className={'mr-0 text-center text-inherit group-hover:text-inherit'}
      >
        {label}
      </Typography>
    </button>
  );
}
