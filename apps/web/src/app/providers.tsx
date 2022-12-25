'use client';

import { AudioEngineProvider } from 'audio-engine';
import { ReactNode } from 'react';
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
