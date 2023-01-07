import Link from 'next/link';
import Button from './Button';

interface Props {
  href: string;
  selected?: boolean;
  disabled?: boolean;
  target?: '_blank' | '_parent' | '_self' | '_top';
  className?: string;
  children: string;
}

export const ButtonLink = ({
  href,
  selected,
  disabled,
  target,
  className,
  children
}: Props) => {
  return (
    <div>
      {disabled && (
        <Button className={className} selected={selected} disabled={disabled}>
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
          <Button className={className} selected={selected} disabled={disabled}>
            {children}
          </Button>
        </Link>
      )}
    </div>
  );
};
