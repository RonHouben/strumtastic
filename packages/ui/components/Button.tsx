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
  fullWidth?: boolean;
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
  color,
  fullWidth
}: Props) {
  const { classNames } = useClassNames();

  return (
    <button
      className={classNames(
        'flex items-center justify-center gap-1 rounded-md text-center font-medium text-slate-200 duration-500',
        fullWidth ? 'w-full' : '',
        size === 'xs' ? 'px-3 py-2 text-xs' : '',
        size === 'sm' ? 'px-3 py-2 text-sm' : '',
        size === 'md' ? 'px-5 py-2.5' : '',
        size === 'lg' ? 'px-5 py-3 text-base' : '',
        size === 'xl' ? 'px-6 py-3.5 text-base' : '',
        color === 'primary' ? 'bg-primary-500' : '',
        color === 'secondary' ? 'bg-secondary-500' : '',
        color === 'green' ? 'bg-green-600' : '',
        color === 'amber' ? 'bg-amber-600' : '',
        color === 'red' ? 'bg-red-600' : '',
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
                ? 'border-green-600 !text-green-600 hover:border-green-500 hover:!text-green-500'
                : '',
              color === 'amber'
                ? 'border-amber-600 !text-amber-600 hover:border-amber-500 hover:!text-amber-500'
                : '',
              color === 'red'
                ? 'border-red-600 !text-red-600 hover:border-red-500 hover:!text-red-500'
                : ''
            )
          : '',
        variant === 'text'
          ? classNames(
              'bg-transparent',
              color === 'primary'
                ? '!text-primary-600 hover:bg-primary-600/25 hover:!text-slate-200 hover:backdrop-grayscale-0'
                : '',
              color === 'secondary'
                ? '!text-secondary-500 hover:bg-secondary-500/25 hover:!text-slate-200 hover:backdrop-grayscale-0'
                : '',
              color === 'green'
                ? '!text-green-600 hover:bg-green-600/25 hover:!text-slate-200 hover:backdrop-grayscale-0'
                : '',
              color === 'amber'
                ? '!text-amber-600 hover:bg-amber-600/25 hover:!text-slate-200 hover:backdrop-grayscale-0'
                : '',
              color === 'red'
                ? '!text-red-600 hover:bg-red-600/25 hover:!text-slate-200 hover:backdrop-grayscale-0'
                : ''
            )
          : '',
        selected
          ? classNames(
              '!text-slate-200',
              variant === 'text'
                ? classNames(
                    color === 'primary'
                      ? 'bg-primary-600/25 backdrop-grayscale-0'
                      : '',
                    color === 'secondary'
                      ? 'bg-secondary-500/25 backdrop-grayscale-0'
                      : '',
                    color === 'green'
                      ? 'bg-green-600/25 backdrop-grayscale-0'
                      : '',
                    color === 'amber'
                      ? 'bg-amber-600/25 backdrop-grayscale-0'
                      : '',
                    color === 'red' ? 'bg-red-600/25 backdrop-grayscale-0' : ''
                  )
                : ''
            )
          : '',
        disabled
          ? classNames(
              'backdrop-grayscale-0',
              color === 'primary' ? 'bg-primary-500/25' : '',
              color === 'secondary' ? 'bg-secondary-500/25' : '',
              color === 'green' ? 'bg-green-600/25' : '',
              color === 'amber' ? 'bg-amber-600/25' : '',
              color === 'red' ? 'bg-red-600/25' : ''
            )
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
