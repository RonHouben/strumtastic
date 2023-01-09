import '@styles/dist.css';
import React from 'react';
import { Navbar } from 'ui/components/Navbar';
import { Sidebar } from 'ui/components';
import { Providers } from './providers';
import { MenuButton } from 'ui/components/Navbar/MenuButtons';

const menuButtons: MenuButton[] = [
  {
    label: 'Admin',
    href: '/admin',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
        />
      </svg>
    ),
  },
];

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <head>
        <title>Strumtastic</title>
      </head>
      <body className="bg-secondary-100 text-base dark:bg-black dark:text-primary-50">
        <div className="grid grid-cols-12 gap-4">
          <Navbar menuButtons={menuButtons} />
          <Sidebar menuButtons={menuButtons} />
          <div className="container col-span-10 col-start-3 mx-auto">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
