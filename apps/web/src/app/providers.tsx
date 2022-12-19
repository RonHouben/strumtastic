'use client';

import { ReactNode, Suspense } from 'react';
import Loading from './loading';
import { AudioEngineProvider } from 'ui/providers/AudioEngineProvider';
import { ExerciseProvider } from 'ui/providers/ExerciseProvider';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <AudioEngineProvider>
        <ExerciseProvider>{children}</ExerciseProvider>
      </AudioEngineProvider>
    </Suspense>
  );
}
