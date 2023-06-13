import { ReactNode } from 'react';
import { GlobalStateProvider } from 'ui/providers/GlobalStateProvider';
import { Analytics } from '@vercel/analytics/react';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <>
      <GlobalStateProvider>{children}</GlobalStateProvider>
      <Analytics />
    </>
  );
}
