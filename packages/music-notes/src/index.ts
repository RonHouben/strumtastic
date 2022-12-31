import { IMusicNote, StringName } from './types';
import Note from '@tonaljs/note';

export * from './types';
export * from './constants';

interface GetMusicNotesForString {
  startNote: StringName;
  numberOfFrets: number;
  sharps?: boolean;
}

export class MusicNotes {
  static getMusicNoteFromFrequency(pitch: number): IMusicNote {
    const noteName = Note.fromFreq(pitch);
    return Note.get(noteName);
  }

  static getMusicNotesForString({
    numberOfFrets,
    startNote,
    sharps
  }: GetMusicNotesForString): IMusicNote[] {
    let currentNoteName: string = startNote; 
    let currentFretNumber = 0;

    const musicNotes: IMusicNote[] = [];

    const openPositionNote = Note.get(startNote);

    musicNotes.push(openPositionNote);

    while (currentFretNumber < numberOfFrets) {
      const nextNoteName = Note.transpose(currentNoteName, '2m');
      const simplifiedNextNoteName = Note.simplify(nextNoteName)
      const nextMusicNote = Note.get(simplifiedNextNoteName);

      musicNotes.push(nextMusicNote);

      currentNoteName = nextNoteName;
      currentFretNumber++;
    }

    return musicNotes;
  }

  static getRangeOfMusicNotes(noteNames: string[]): IMusicNote[] {
    return noteNames.map((noteName) => Note.get(noteName));
  }

  static getMusicNoteByName(noteName: string): IMusicNote {
    return Note.get(noteName);
  }
}
