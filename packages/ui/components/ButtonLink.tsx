import Link from 'next/link';
import { Color, Size, Variant } from '../types';
import Button from './Button';

interface Props {
  href: string;
  selected?: boolean;
  disabled?: boolean;
  target?: '_blank' | '_parent' | '_self' | '_top';
  className?: string;
  children: string;
  icon?: React.ReactNode;
  size: Size;
  variant: Variant;
  color: Color;
  fullWidth?: boolean;
}

export const ButtonLink = ({
  href,
  selected,
  disabled,
  target,
  className,
  children,
  icon,
  size,
  variant,
  color,
  fullWidth
}: Props) => {
  return (
    <div>
      {disabled && (
        <Button
          fullWidth={fullWidth}
          className={className}
          selected={selected}
          disabled={disabled}
          icon={icon}
          size={size}
          variant={variant}
          color={color}
        >
          {children}
        </Button>
      )}
      {!disabled && (
        <Link
          aria-disabled={disabled}
          href={href}
          target={target}
          className="no-underline"
          tabIndex={-1}
        >
          <Button
            fullWidth={fullWidth}
            className={className}
            selected={selected}
            disabled={disabled}
            icon={icon}
            size={size}
            variant={variant}
            color={color}
          >
            {children}
          </Button>
        </Link>
      )}
    </div>
  );
};
