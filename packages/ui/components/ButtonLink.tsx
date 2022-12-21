import Link from 'next/link';
import { Button } from './Button';

interface Props {
  label: string;
  href: string;
  target?: '_blank' | '_parent' | '_self' | '_top';
  className?: string;
}

export const ButtonLink = ({ href, label, target, className }: Props) => {
  return (
    <Link
      href={href}
      target={target}
      className='no-underline'
    >
      <Button label={label} onClick={() => {}} className={className} />
    </Link>
  );
};
