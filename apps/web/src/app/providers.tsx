import { ReactNode } from 'react';
import { GlobalStateProvider } from 'ui/providers/GlobalStateProvider';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return <GlobalStateProvider>{children}</GlobalStateProvider>;
}
