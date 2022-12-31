import { IMusicNote, MusicNotes } from 'music-notes';
import { useMemo } from 'react';
import { useAudioEngine } from './useAudioEngine';

interface UseMusicNotesResult {
  currentMusicNote: IMusicNote | undefined;
  getMusicNoteFromFrequency: typeof MusicNotes.getMusicNoteFromFrequency;
  getRangeOfMusicNotes: typeof MusicNotes.getRangeOfMusicNotes;
  getMusicNotesForString: typeof MusicNotes.getMusicNotesForString;
  getMusicNoteByName: typeof MusicNotes.getMusicNoteByName;
}

export function useMusicNotes(): UseMusicNotesResult {
  const { state: audioEngineState } = useAudioEngine();

  const currentMusicNote = useMemo(() => {
    const currentFrequency =
      audioEngineState.context.audioEngine?.currentFrequency;

    if (currentFrequency) {
      return MusicNotes.getMusicNoteFromFrequency(currentFrequency);
    }
  }, [audioEngineState.context.audioEngine?.currentFrequency]);

  return {
    currentMusicNote,
    getMusicNoteFromFrequency: MusicNotes.getMusicNoteFromFrequency,
    getRangeOfMusicNotes: MusicNotes.getRangeOfMusicNotes,
    getMusicNoteByName: MusicNotes.getMusicNoteByName,
    getMusicNotesForString: MusicNotes.getMusicNotesForString
  };
}
