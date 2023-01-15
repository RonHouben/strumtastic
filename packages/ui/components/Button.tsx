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
        'flex items-center justify-center gap-1 rounded-md text-center font-medium duration-500',
        fullWidth ? 'w-full' : '',
        size === 'xs' ? 'px-3 py-2 text-xs' : '',
        size === 'sm' ? 'px-3 py-2 text-sm' : '',
        size === 'md' ? 'px-5 py-2.5' : '',
        size === 'lg' ? 'px-5 py-3 text-base' : '',
        size === 'xl' ? 'px-6 py-3.5 text-base' : '',
        color === 'primary'
          ? 'bg-primary-500 text-primary-800 hover:text-primary-50'
          : '',
        color === 'secondary'
          ? 'bg-secondary-500 text-secondary-800 hover:text-secondary-50'
          : '',
        color === 'green'
          ? 'bg-green-500 text-green-800 hover:text-green-50'
          : '',
        color === 'amber'
          ? 'bg-amber-500 text-amber-800 hover:text-amber-50'
          : '',
        color === 'red' ? 'bg-red-500 text-red-800 hover:text-red-50' : '',
        variant === 'filled'
          ? classNames(
              'hover:shadow-lg hover:brightness-125',
              color === 'primary' ? '!text-primary-200' : '',
              color === 'secondary' ? '!text-secondary-200' : '',
              color === 'green' ? '!text-green-200' : '',
              color === 'amber' ? '!text-amber-200' : '',
              color === 'red' ? '!text-red-200' : ''
            )
          : '',
        variant === 'outlined'
          ? classNames(
              'border !bg-transparent',
              color === 'primary'
                ? 'border-primary-500 !text-primary-500 hover:!text-primary-900'
                : '',
              color === 'secondary'
                ? 'border-secondary-500 !text-secondary-500 hover:!text-secondary-900'
                : '',
              color === 'green'
                ? 'border-green-500 !text-green-500 hover:!text-green-900'
                : '',
              color === 'amber'
                ? 'border-amber-600 !text-amber-500 hover:!text-amber-900'
                : '',
              color === 'red'
                ? 'border-red-600 !text-red-500 hover:!text-red-900'
                : ''
            )
          : '',
        variant === 'text'
          ? classNames(
              '!bg-transparent',
              color === 'primary'
                ? 'hover:!bg-primary-500/50 hover:!text-primary-400'
                : '',
              color === 'secondary'
                ? 'hover:!bg-secondary-500/50 hover:!text-secondary-400'
                : '',
              color === 'green'
                ? 'hover!:text-green-400 hover:!bg-green-500/50'
                : '',
              color === 'amber'
                ? 'hover!:text-amber-400 hover:!bg-amber-500/50'
                : '',
              color === 'red' ? 'hover!:text-red-400 hover:!bg-red-500/50' : ''
            )
          : '',
        selected
          ? classNames(
              'brightness-125',
              variant === 'filled' ? 'shadow-lg' : '',
              variant === 'outlined' ? '' : '',
              variant === 'text'
                ? classNames(
                    'dark:!brightness-100',
                    color === 'primary'
                      ? '!bg-primary-500/100  !text-primary-200 hover:!text-primary-50 dark:!bg-primary-500/70'
                      : '',
                    color === 'secondary'
                      ? '!bg-secondary-500/100 !text-secondary-200 hover:!text-secondary-50 dark:!bg-secondary-500/70'
                      : '',
                    color === 'green'
                      ? 'hover!:text-green-50 !bg-green-500/100 !text-green-200 dark:!bg-green-500/70'
                      : '',
                    color === 'amber'
                      ? 'hover!:text-amber-50 !bg-amber-500/100 !text-amber-200 dark:!bg-amber-500/70'
                      : '',
                    color === 'red'
                      ? 'hover!:text-red-50 !bg-red-500/100 !text-red-200 dark:!bg-red-500/70'
                      : ''
                  )
                : ''
            )
          : '',
        disabled
          ? classNames(
              'cursor-not-allowed brightness-50 backdrop-grayscale-0 hover:!bg-transparent',
              color === 'primary' ? 'hover:!text-primary-800' : '',
              color === 'secondary' ? 'hover:!text-secondary-800' : '',
              color === 'green' ? 'hover:!text-green-800' : '',
              color === 'amber' ? 'hover:!text-amber-800' : '',
              color === 'red' ? 'hover:!text-red-800' : ''
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
