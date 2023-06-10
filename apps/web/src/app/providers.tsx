import { ReactNode } from 'react';
import { TRCPClientProvider } from '@client/trpc';
import { GlobalStateProvider } from 'ui/providers/GlobalStateProvider';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <TRCPClientProvider>
      <GlobalStateProvider>{children}</GlobalStateProvider>
    </TRCPClientProvider>
  );
}
