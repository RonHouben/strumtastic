'use client';

import { useState } from 'react';

export default function MobileMenuButton() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md p-2 text-secondary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-500"
      aria-controls="mobile-menu"
      aria-expanded="false"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        {menuOpen && (
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        )}
        {!menuOpen && (
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        )}
      </svg>
    </button>
  );
}
