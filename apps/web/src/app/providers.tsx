'use client';

import { ReactNode } from 'react';
import { GlobalStateProvider } from 'ui/providers/GlobalStateProvider';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <>
      <GlobalStateProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </GlobalStateProvider>
      <Analytics />
    </>
  );
}
