'use client';

import * as React from 'react';
import Link from 'next/link';
import { appConfig } from '@config/app';
import { Icons } from '@ui/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@ui/components/dropdown-menu';
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
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {appConfig.mainNavItems.map((item) => (
          <React.Fragment key={item.label}>
            {!item.items?.length && (
              <NavLink key={item.label} href={item.href ?? '#'}>
                {item.label}
              </NavLink>
            )}
            {item.items?.length && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <NavLink href="#">{item.label}</NavLink>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.items.map((subItem) => (
                    <DropdownMenuGroup key={subItem.label}>
                      <DropdownMenuItem>
                        <NavLink href={subItem.href ?? '#'}>
                          {subItem.label}
                        </NavLink>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
