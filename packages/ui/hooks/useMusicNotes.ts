import { MusicNotes } from 'music-notes';

interface UseMusicNotesResult {
  getMusicNoteFromFrequency: typeof MusicNotes.getMusicNoteFromFrequency;
  getMusicNotesForString: typeof MusicNotes.getMusicNotesForString;
  getMusicNoteByName: typeof MusicNotes.getMusicNoteByName;
  getMusicNotesByNames: typeof MusicNotes.getMusicNotesByNames;
  transformMusicNoteAccidental: typeof MusicNotes.transformMusicNoteAccidental;
  transformMusicNotesAccidentals: typeof MusicNotes.transformMusicNotesAccidentals;
}

export function useMusicNotes(): UseMusicNotesResult {
  return {
    getMusicNoteFromFrequency: MusicNotes.getMusicNoteFromFrequency,
    getMusicNoteByName: MusicNotes.getMusicNoteByName,
    getMusicNotesByNames: MusicNotes.getMusicNotesByNames,
    getMusicNotesForString: MusicNotes.getMusicNotesForString,
    transformMusicNoteAccidental: MusicNotes.transformMusicNoteAccidental,
    transformMusicNotesAccidentals: MusicNotes.transformMusicNotesAccidentals,
  };
}
