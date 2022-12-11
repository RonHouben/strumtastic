import '@styles/dist.css';
import React from 'react';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Musician</title>
      </head>
      <body className="">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
