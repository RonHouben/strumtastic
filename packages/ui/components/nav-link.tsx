'use client';

import { cn } from '@ui/utils';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props extends LinkProps {
  key?: string;
  className?: string;
  children: React.ReactNode;
}

export const NavLink = React.forwardRef(
  (
    { className, children, ...props }: Props,
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    const pathname = usePathname();

    return (
      <Link
        ref={ref}
        {...props}
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname === props.href ? 'text-foreground' : 'text-foreground/60'
        )}
      >
        {children}
      </Link>
    );
  }
);
