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
          {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"> */}
            <MobileMenuButton
              isMenuOpen={isMobileMenuOpen}
              onClick={setIsMobileMenuOpen}
            />
          {/* </div> */}
          <div className="flex max-sm:justify-center">
            <Link href="/">
              <Typography variant="h1" className="mb-0 text-gray-100">
                Strumtastic
              </Typography>
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex h-full items-center justify-end space-x-4">
                {/* <MenuButtons buttons={menuButtons} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileMenu>
          <div className="flex flex-col gap-3">
            {/* <MenuButtons buttons={menuButtons} /> */}
          </div>
        </MobileMenu>
      )}
    </nav>
  );
}
