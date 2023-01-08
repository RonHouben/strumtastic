import { MusicNotes } from 'music-notes';

interface UseMusicNotesResult {
  getMusicNoteFromFrequency: typeof MusicNotes.getMusicNoteFromFrequency;
  getRangeOfMusicNotes: typeof MusicNotes.getRangeOfMusicNotes;
  getMusicNotesForString: typeof MusicNotes.getMusicNotesForString;
  getMusicNoteByName: typeof MusicNotes.getMusicNoteByName;
}

export function useMusicNotes(): UseMusicNotesResult {
  return {
    getMusicNoteFromFrequency: MusicNotes.getMusicNoteFromFrequency,
    getRangeOfMusicNotes: MusicNotes.getRangeOfMusicNotes,
    getMusicNoteByName: MusicNotes.getMusicNoteByName,
    getMusicNotesForString: MusicNotes.getMusicNotesForString
  };
}
