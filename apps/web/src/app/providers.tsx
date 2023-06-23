'use client';

import { ReactNode } from 'react';
import { StateMachinesProvider } from 'ui/providers/StateMachinesProvider';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <>
      <StateMachinesProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
      </StateMachinesProvider>
      <Analytics />
    </>
  );
}
