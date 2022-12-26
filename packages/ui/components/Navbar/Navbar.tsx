'use client';

import { useState } from 'react';
import Link from '../Link';
import { Typography } from '../Typography';
import MenuButtons, { MenuButton } from './MenuButtons';
import MobileMenu from './MobileMenu';
import MobileMenuButton from './MobileMenuButton';

const menuButtons: MenuButton[] = [
  {
    label: 'Connect guitar',
    href: '/connect-guitar',
  },
  {
    label: 'Tuner',
    href: '/tuner',
  },
  {
    label: 'Exercise',
    href: '/exercise'
  }
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className='mb-2 shadow-2xl'>
      <div className="mx-auto max-w-7xl">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <MobileMenuButton
              isMenuOpen={isMobileMenuOpen}
              onClick={setIsMobileMenuOpen}
            />
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <Typography variant="h1">Strumtastic</Typography>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex items-center h-full space-x-4">
                <MenuButtons buttons={menuButtons} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileMenu>
          <div className="flex flex-col gap-3">
            <MenuButtons buttons={menuButtons} />
          </div>
        </MobileMenu>
      )}
    </nav>
  );
}
