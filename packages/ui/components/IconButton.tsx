import { cn } from '../utils';
import { Color, Size, Variant } from '../types';
import { Button } from './button';
import { MouseEvent } from 'react';

interface Props {
  size: Size;
  variant: Variant;
  color: Color;
  children: React.ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function IconButton({ children, size, variant, color, onClick, className }: Props) {
  return (
    <Button
      color={color}
      className={cn(
        'rounded-full',
        size === 'xs' ? 'h-5 w-5 !p-1' : '',
        size === 'sm' ? 'h-6 w-6 !p-1' : '',
        size === 'md' ? 'h-7 w-7 !p-1' : '',
        size === 'lg' ? 'h-8 w-8 !p-1' : '',
        size === 'xl' ? 'h-9 w-9 !p-1' : '',
        className || ''
      )}
      onClick={onClick}
    >
      {''}
    </Button>
  );
}
