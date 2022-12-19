'use client';

import { GuitarFretboard } from 'ui/components/GuitarFretboard';
import { AudioEngineDebugger } from 'ui/components/AudioEngine';
import { useAudioEngine } from 'ui/hooks/useAudioEngine';
import { useMusicNotes } from 'ui/hooks/useMusicNotes';

export default function Page() {
  const audioEngine = useAudioEngine();
  const { musicNotes } = useMusicNotes();

  return (
    <div>
      <GuitarFretboard
        numberOfFrets={24}
        currentlyPlayedNote={audioEngine.currentMusicNote}
        notesToPlay={musicNotes.filter((note) =>
          note.positions.some((pos) => pos.string === 'E2' && pos.fret === 12),
        )}
      />
      <AudioEngineDebugger />
    </div>
  );
}
