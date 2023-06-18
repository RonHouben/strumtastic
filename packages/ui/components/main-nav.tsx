import * as React from 'react';
import Link from 'next/link';
import { appConfig } from '@config/app';
import { Icons } from '@ui/components/icons';
import { NavLink } from '@ui/components/nav-link';

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {appConfig.name}
        </span>
      </Link>
      <nav className="text-md flex items-center space-x-6 font-medium">
        {appConfig.mainNavItems.map((item) => (
          <React.Fragment key={item.label}>
            <NavLink key={item.label} href={item.href ?? '#'}>
              {item.label}
            </NavLink>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
