'use client';

import { GuitarFretboard } from 'ui/components/GuitarFretboard';
import { AudioEngineDebugger } from 'ui/components/AudioEngine';
import { useAudioEngine } from 'ui/hooks/useAudioEngine';
import { useExercise } from 'ui/hooks/useExercise';
import { useEffect } from 'react';

export default function Page() {
  const audioEngine = useAudioEngine();
  const { state } = useExercise();

  useEffect(() => {
    console.log(state);
  }, [state])

  return (
    <div>
      <GuitarFretboard
        numberOfFrets={24}
        currentlyPlayedNote={audioEngine.currentMusicNote}
        notesToPlay={state.notesToPlay}
      />
      <AudioEngineDebugger />
    </div>
  );
}
