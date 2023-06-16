'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { appConfig } from '@config/app';
import { cn } from '@ui/utils';
import { Icons } from '@ui/components/icons';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {appConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {appConfig.mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === item.href ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
