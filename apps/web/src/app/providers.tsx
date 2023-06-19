'use client';

import { ReactNode, useEffect } from 'react';
import { StateMachinesProvider } from 'ui/providers/StateMachinesProvider';
import { ThemeProvider, useTheme } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  const { theme } = useTheme();

  useEffect(() => {
    console.log(theme);
  }, [theme]);

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
