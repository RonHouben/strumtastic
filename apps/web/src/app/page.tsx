'use client';

import { GuitarFretboard } from 'ui/components/GuitarFretboard';
import { AudioEngineDebugger } from 'ui/components/AudioEngine';
import { useExercise } from 'ui/hooks/useExercise';
import { useEffect } from 'react';

export default function Page() {
  const { state } = useExercise();

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <GuitarFretboard numberOfFrets={24} notesToPlay={state.notesToPlay} />
      <AudioEngineDebugger />
    </div>
  );
}
