'use client';

import { useState } from 'react';
import Link from '../Link';
import { Typography } from '../Typography';
import MobileMenu from './MobileMenu';
import MobileMenuButton from './MobileMenuButton';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="col-span-12 col-start-1 mb-2 bg-secondary-500 shadow-md dark:bg-secondary-900">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex h-16 items-center max-sm:justify-center">
          <MobileMenuButton
            isMenuOpen={isMobileMenuOpen}
            onClick={setIsMobileMenuOpen}
          />
          <div className="flex max-sm:justify-center">
            <Link href="/">
              <Typography variant="h1" className="mb-0 text-gray-100">
                Strumtastic
              </Typography>
            </Link>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && <MobileMenu />}
    </nav>
  );
}
