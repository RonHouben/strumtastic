import '@styles/dist.css';
import React from 'react';
import { Providers } from './providers';

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <head>
        <title>Musician</title>
      </head>
      <body className='container min-h-screen h-full bg-slate-500'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
