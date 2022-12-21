'use client';

import { ReactNode } from 'react';
import { AudioEngineProvider } from 'ui/providers/AudioEngineProvider';
import { ExerciseProvider } from 'ui/providers/ExerciseProvider';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <AudioEngineProvider>
      <ExerciseProvider>{children}</ExerciseProvider>
    </AudioEngineProvider>
  );
}
