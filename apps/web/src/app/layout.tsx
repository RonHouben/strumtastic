import '@styles/dist.css';
import React from 'react';
import { Navbar } from 'ui/components/Navbar';
import { Sidebar } from 'ui/components';
import { Providers } from './providers';

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
          <Navbar />
          <Sidebar />
          <div className="container col-span-10 col-start-3 mx-auto max-sm:col-span-12 max-sm:col-start-1">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
