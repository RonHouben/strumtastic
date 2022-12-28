'use client';

import { ReactNode } from 'react';
import { ExerciseProvider } from 'ui/providers/ExerciseProvider';
import { GlobalStateProvider } from 'ui/providers/GlobalStateProvider';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <GlobalStateProvider>
      <ExerciseProvider>{children}</ExerciseProvider>
    </GlobalStateProvider>
  );
}
