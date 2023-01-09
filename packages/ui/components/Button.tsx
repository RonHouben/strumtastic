'use client';

import { ButtonHTMLAttributes } from 'react';
import { useClassNames } from '../hooks/useClassNames';
import { Color, Size, Variant } from '../types';

interface Props {
  selected?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  icon?: React.ReactNode;
  size: Size;
  variant: Variant;
  color: Color;
}

export default function Button({
  selected,
  disabled,
  onClick,
  className,
  children,
  type,
  icon,
  size,
  variant,
  color
}: Props) {
  const { classNames } = useClassNames();

  return (
    <button
      className={classNames(
        'flex items-center justify-center gap-1 rounded-md text-center font-medium text-slate-100 duration-500',
        size === 'xs' ? 'px-3 py-2 text-xs' : '',
        size === 'sm' ? 'px-3 py-2 text-sm' : '',
        size === 'md' ? 'px-5 py-2.5' : '',
        size === 'lg' ? 'px-5 py-3 text-base' : '',
        size === 'xl' ? 'px-6 py-3.5 text-base' : '',
        color === 'primary' ? 'bg-primary-500' : '',
        color === 'secondary' ? 'bg-secondary-500' : '',
        color === 'green' ? 'bg-green-500' : '',
        color === 'amber' ? 'bg-amber-500' : '',
        color === 'red' ? 'bg-red-500' : '',
        variant === 'filled' ? 'hover:shadow-lg' : '',
        variant === 'outlined'
          ? classNames(
              'border bg-transparent',
              color === 'primary'
                ? 'border-primary-500 !text-primary-500 hover:border-primary-400 hover:!text-primary-400'
                : '',
              color === 'secondary'
                ? 'border-secondary-500 !text-secondary-500 hover:border-secondary-400 hover:!text-secondary-400'
                : '',
              color === 'green'
                ? 'border-green-500 !text-green-500 hover:border-green-400 hover:!text-green-400'
                : '',
              color === 'amber'
                ? 'border-amber-500 !text-amber-500 hover:border-amber-400 hover:!text-amber-400'
                : '',
              color === 'red'
                ? 'border-red-500 !text-red-500 hover:border-red-400 hover:!text-red-400'
                : ''
            )
          : '',
        variant === 'text'
          ? classNames(
              'bg-transparent',
              color === 'primary' ? '!text-primary-500 hover:backdrop-grayscale-0 hover:bg-primary-500/25' : '',
              color === 'secondary' ? '!text-secondary-500 hover:backdrop-grayscale-0 hover:bg-secondary-500/25' : '',
              color === 'green' ? '!text-green-500 hover:backdrop-grayscale-0 hover:bg-green-500/25' : '',
              color === 'amber' ? '!text-amber-500 hover:backdrop-grayscale-0 hover:bg-amber-500/25' : '',
              color === 'red' ? '!text-red-500 hover:backdrop-grayscale-0 hover:bg-red-500/25' : '',
            )
          : '',
        selected ? '!bg:primary-400 dark:!bg-secondary-700' : '',
        disabled
          ? '!bg-primary-200 dark:border dark:border-secondary-900 dark:!bg-transparent'
          : '',
        className || ''
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon}
      {children}
    </button>
  );
}
