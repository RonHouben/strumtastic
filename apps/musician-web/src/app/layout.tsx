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
      <body className='bg-secondary-100 dark:bg-black'>
        <Navbar />
        <div className="container mx-auto">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
