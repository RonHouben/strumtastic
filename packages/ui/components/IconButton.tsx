import { useClassNames } from '../hooks/useClassNames';
import { Color, Size, Variant } from '../types';
import Button from './Button';

interface Props {
  size: Size;
  variant: Variant;
  color: Color;
  children: React.ReactNode;
}

export default function IconButton({ children, size, variant, color }: Props) {
  const { classNames } = useClassNames();

  return (
    <Button
      size={size}
      variant={variant}
      color={color}
      icon={children}
      className={classNames(
        'rounded-full',
        size === 'xs' ? 'h-5 w-5 !p-1' : '',
        size === 'sm' ? 'h-6 w-6 !p-1' : '',
        size === 'md' ? 'h-7 w-7 !p-1' : '',
        size === 'lg' ? 'h-8 w-8 !p-1' : '',
        size === 'xl' ? 'h-9 w-9 !p-1' : ''
      )}
    >
      {''}
    </Button>
  );
}
