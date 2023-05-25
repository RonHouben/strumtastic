import Note from '@tonaljs/note';
import { FlatsOrSharps, IMusicNote, StringName } from './types';

export * from './constants';
export * from './types';

interface GetMusicNotesForString {
  startNote: StringName;
  numberOfFrets: number;
  flatsOrSharps?: FlatsOrSharps;
}

export class MusicNotes {
  private static transformAccidental(
    noteName: IMusicNote['name'],
    flatsOrSharps?: FlatsOrSharps
  ): IMusicNote['name'] {
    if (!flatsOrSharps) {
      return noteName;
    }

    if (flatsOrSharps === 'flats' && noteName.includes('#')) {
      return Note.enharmonic(noteName);
    }

    if (flatsOrSharps === 'sharps' && noteName.includes('b')) {
      return Note.enharmonic(noteName);
    }

    return noteName;
  }

  public static getMusicNoteFromFrequency(
    pitch: number,
    flatsOrSharps?: FlatsOrSharps
  ): IMusicNote {
    const noteName = Note.fromFreq(pitch);
    const transformedAccidental = MusicNotes.transformAccidental(
      noteName,
      flatsOrSharps
    );

    return Note.get(transformedAccidental);
  }

  public static getMusicNotesForString({
    numberOfFrets,
    startNote,
    flatsOrSharps
  }: GetMusicNotesForString): IMusicNote[] {
    let currentNoteName: string = startNote;
    let currentFretNumber = 0;

    const musicNotes: IMusicNote[] = [];

    const openPositionNote = Note.get(startNote);

    musicNotes.push(openPositionNote);

    while (currentFretNumber < numberOfFrets) {
      const nextNoteName = Note.transpose(currentNoteName, '2m');
      const simplifiedNextNoteName = Note.simplify(nextNoteName);
      const transformedAccidental = MusicNotes.transformAccidental(
        simplifiedNextNoteName,
        flatsOrSharps
      );
      const nextMusicNote = Note.get(transformedAccidental);

      musicNotes.push(nextMusicNote);

      currentNoteName = nextNoteName;
      currentFretNumber++;
    }

    return musicNotes;
  }

  public static getMusicNotesByNames(
    noteNames: string[],
    flatsOrSharps?: FlatsOrSharps
  ): IMusicNote[] {
    return noteNames.map((noteName) =>
      MusicNotes.getMusicNoteByName(noteName, flatsOrSharps)
    );
  }

  public static getMusicNoteByName(
    noteName: string,
    flatsOrSharps?: FlatsOrSharps
  ): IMusicNote {
    const transformedAccidental = MusicNotes.transformAccidental(
      noteName,
      flatsOrSharps
    );

    return Note.get(transformedAccidental);
  }

  public static transformMusicNoteAccidental(
    flatsOrSharps: FlatsOrSharps,
    musicNote: IMusicNote
  ): IMusicNote {
    const transformedAccidental = MusicNotes.transformAccidental(
      musicNote.name,
      flatsOrSharps
    );
    return Note.get(transformedAccidental);
  }

  public static transformMusicNotesAccidentals(
    musicNotes: IMusicNote[],
    flatsOrSharps?: FlatsOrSharps
  ): IMusicNote[] {
    if (!flatsOrSharps) {
      return musicNotes;
    }

    return musicNotes.map((musicNote) =>
      MusicNotes.transformMusicNoteAccidental(flatsOrSharps, musicNote)
    );
  }
}
