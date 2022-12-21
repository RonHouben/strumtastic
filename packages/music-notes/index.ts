import { MUSIC_NOTES } from './constants/musicnotes.constant';
import { FlatsOrSharps, IMusicNote, StringName } from './types';

export * from './types';

const NOTES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B'
] as const;
const CONCERT_PITCH = 440; //frequency of a fixed note, which is used as a standard for tuning. It is usually a standard (also called concert) pitch of 440 Hz, which is called A440 or note A in the one-line (or fourth) octave (A4)
const MIDI = 69; // the MIDI note number of A4
const A = 2 ** (1 / 12); // the twelth root of 2 = the number which when multiplied by itself 12 times equals 2 = 1.059463094359...
const C0_PITCH = 16.35; // frequency of lowest note: C0

export class MusicNotes {
  static getAllMusicNotes(): IMusicNote[] {
    return MUSIC_NOTES;
  }

  // static getNoteFromFrequency(frequency: number): IMusicNote {
  //   let closestLower: IMusicNote = MUSIC_NOTES[0];
  //   let closestHigher: IMusicNote = MUSIC_NOTES[MUSIC_NOTES.length - 1];

  //   for (const musicNote of MUSIC_NOTES) {
  //     if (musicNote.hz < frequency) {
  //       closestLower = musicNote;
  //     }

  //     if (musicNote.hz > frequency) {
  //       closestHigher = musicNote;
  //       break; // going from low to high so we can stop here
  //     }
  //   }

  //   const distanceToLower = Math.abs(frequency - closestLower.hz);
  //   const distanceToHigher = Math.abs(frequency - closestHigher.hz);

  //   return Math.min(distanceToLower, distanceToHigher) === distanceToLower
  //     ? closestLower
  //     : closestHigher;
  // }

  static getMusicNoteFromFrequency(pitch: number): IMusicNote | undefined {
    if (pitch === -1) {
      return undefined;
    }

    const N = Math.round(12 * Math.log2(pitch / CONCERT_PITCH)); // the number of half steps away from the fixed note you are. If you are at a higher note, n is positive. If you are on a lower note, n is negative.
    const Fn = CONCERT_PITCH * A ** N; // the frequency of the note n half steps away of concert pitch
    const noteIndex = (N + MIDI) % 12; // index of note letter from NOTES array
    const octave = Math.floor(Math.log2(Fn / C0_PITCH));

    const noteName = NOTES[noteIndex];

    return this.getMusicNoteByNoteNameAndOctave(noteName, octave);
  }

  static getMusicNoteByNoteNameAndOctave(
    noteName: string,
    octave: number
  ): IMusicNote | undefined {
    return MUSIC_NOTES.find(
      (musicNote) =>
        Object.values(musicNote.names).includes(noteName) &&
        musicNote.octave === octave
    );
  }

  static getNoteByStringAndFret(
    stringName: StringName,
    fret: number
  ): IMusicNote | undefined {
    return MUSIC_NOTES.find((note) =>
      note.positions.some(
        (pos) => pos.string === stringName && pos.fret === fret
      )
    );
  }

  static getNotesForString(
    stringName: StringName,
    numberOfFrets: number
  ): IMusicNote[] {
    const firstNoteIndex = MUSIC_NOTES.findIndex((note) =>
      note.positions.some((pos) => pos.string === stringName && pos.fret === 0)
    );

    const lastNoteIndex = MUSIC_NOTES.findIndex((note) =>
      note.positions.some(
        (pos) => pos.string === stringName && pos.fret === numberOfFrets
      )
    );

    return MUSIC_NOTES.slice(firstNoteIndex, lastNoteIndex + 1);
  }

  static getNoteName(
    flatOrSharp: FlatsOrSharps,
    musicNote: IMusicNote
  ): string {
    if (musicNote.names.natural) {
      return musicNote.names.natural;
    }

    if (flatOrSharp === 'flats' && musicNote.names.flat) {
      return musicNote.names.flat;
    }

    if (flatOrSharp === 'sharps' && musicNote.names.sharp) {
      return musicNote.names.sharp;
    }

    throw new Error(
      `Couldn't find note name for: ${flatOrSharp} ${JSON.stringify(
        musicNote.names
      )}`
    );
  }

  static getMusicNotesByNames(
    noteNames: string[],
    startOctave: number,
    numberOfOctaves: number
  ): IMusicNote[] {
    return MUSIC_NOTES.filter((musicNote) => {
      const isOctaveLowerThanStartOctave = musicNote.octave < startOctave;
      const isOctaveHigherThanMaxOctave =
        musicNote.octave >= startOctave + numberOfOctaves;

      if (isOctaveLowerThanStartOctave || isOctaveHigherThanMaxOctave) {
        return false;
      }

      return noteNames.some((noteName) =>
        Object.values(musicNote.names).includes(noteName)
      );
    });
  }

  static getMusicNoteByName(noteName: string): IMusicNote | undefined {
    return MUSIC_NOTES.find((musicNote) =>
      Object.values(musicNote.names).includes(noteName)
    );
  }
}
