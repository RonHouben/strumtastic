import '@styles/dist.css';
import React from 'react';
import { Providers } from './providers';
import { Metadata } from 'next';
import { cn } from 'ui/utils';
import { fonts } from 'ui/utils';
import { appConfig } from '@config/app';
import { SiteHeader } from '@ui/components/site-header';
import { SiteFooter } from '@ui/components/site-footer';

export const metadata: Metadata = {
  title: appConfig.name,
  description: appConfig.description,
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fonts.sans.variable,
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
