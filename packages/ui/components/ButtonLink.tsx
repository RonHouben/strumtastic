import Link from 'next/link';
import Button from './Button';

interface Props {
  label: string;
  href: string;
  selected?: boolean;
  disabled?: boolean;
  target?: '_blank' | '_parent' | '_self' | '_top';
  className?: string;
}

export const ButtonLink = ({
  href,
  label,
  selected,
  disabled,
  target,
  className
}: Props) => {
  return (
    <div>
      {disabled && (
        <Button
          label={label}
          className={className}
          selected={selected}
          disabled={disabled}
        />
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
            label={label}
            className={className}
            selected={selected}
            disabled={disabled}
          />
        </Link>
      )}
    </div>
  );
};
