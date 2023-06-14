import { cn } from '../utils';
import { Color, Size, Variant } from '../types';
import { ButtonLink } from './ButtonLink';

interface Props {
  href: string;
  size: Size;
  variant: Variant;
  color: Color;
  children: React.ReactNode;
}

export default function IconButtonLink({
  children,
  size,
  variant,
  color,
  href
}: Props) {
  return (
    <ButtonLink
      href={href}
      size={size}
      variant={variant}
      color={color}
      icon={children}
      className={cn(
        'rounded-full',
        size === 'xs' ? 'h-5 w-5 !p-1' : '',
        size === 'sm' ? 'h-6 w-6 !p-1' : '',
        size === 'md' ? 'h-7 w-7 !p-1' : '',
        size === 'lg' ? 'h-8 w-8 !p-1' : '',
        size === 'xl' ? 'h-9 w-9 !p-1' : ''
      )}
    >
      {''}
    </ButtonLink>
  );
}
