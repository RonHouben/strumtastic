import '@styles/dist.css';
import React from 'react';
import { Navbar } from 'ui/components/Navbar';
import {} from 'ui/components';
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
      <body className='bg-secondary-100 dark:bg-black dark:text-primary-50'>
        <Navbar />
        <div className="container mx-auto pt-4">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
