'use client';

import { GuitarFretboard } from 'ui/components/GuitarFretboard';
import { AudioEngineDebugger } from 'ui/components/AudioEngine';
import { useAudioEngine } from 'ui/hooks/useAudioEngine';

export default function Page() {
  const audioEngine = useAudioEngine();

  return (
    <div>
      <GuitarFretboard numberOfFrets={24} playedNote={audioEngine.currentMusicNote} />
      <AudioEngineDebugger />
    </div>
  );
}
