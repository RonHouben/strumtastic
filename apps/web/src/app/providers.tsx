import { ReactNode } from 'react';
import { TRCPClientProvider } from '@client/trpc';
import { GlobalStateProvider } from 'ui/providers/GlobalStateProvider';
import { initFirestore } from 'database';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  initFirestore();

  return (
    <TRCPClientProvider>
      <GlobalStateProvider>{children}</GlobalStateProvider>
    </TRCPClientProvider>
  );
}
