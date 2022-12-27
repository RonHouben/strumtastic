import NextLink from 'next/link';
import { useClassNames } from '../hooks/useClassNames';

interface Props {
  href: string;
  target?: '_blank' | '_parent' | '_self' | '_top';
  tabIndex?: number;
  className?: string;
  children: React.ReactNode;
}

export default function Link({ href, target, tabIndex, className, children }: Props) {
	const { classNames } = useClassNames();

  return (
    <NextLink
      href={href}
      target={target}
      className={classNames('no-underline text-accent-500 hover:text-accent-800 duration-500 outline-secondary-700', className || '')}
      tabIndex={tabIndex}
    >
      {children}
    </NextLink>
  );
}
