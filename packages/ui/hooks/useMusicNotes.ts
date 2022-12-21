import { FlatsOrSharps, IMusicNote, MusicNotes, StringName } from 'music-notes';

interface UseMusicNotesResult {
  allMusicNotes: IMusicNote[];
  getMusicNotesByNoteNames: (
    noteNames: string[],
    startOctave: number,
    numberOfOctaves: number
  ) => IMusicNote[];
  getMusicNoteByNoteName: (noteName: string) => IMusicNote | undefined;
  getNoteName: (flatOrSharp: FlatsOrSharps, musicNote: IMusicNote) => string;
  getMusicNotesForString: (
    stringName: StringName,
    numberOfFrets: number
  ) => IMusicNote[];
  getMusicNoteFromFrequency: (frequency: number) => IMusicNote | undefined;
  getNoteNameFromFrequency: (
    flatOrSharp: FlatsOrSharps,
    freqency: number
  ) => string | undefined;
}

export function useMusicNotes(): UseMusicNotesResult {
  return {
    allMusicNotes: MusicNotes.getAllMusicNotes(),
    getMusicNotesByNoteNames: MusicNotes.getMusicNotesByNames,
    getMusicNoteByNoteName: MusicNotes.getMusicNoteByName,
    getNoteName: MusicNotes.getNoteName,
    getMusicNotesForString: MusicNotes.getNotesForString,
    getMusicNoteFromFrequency: MusicNotes.getMusicNoteFromFrequency,
    getNoteNameFromFrequency: MusicNotes.getNoteNameFromFrequency
  };
}
