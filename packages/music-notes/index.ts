import { MUSIC_NOTES } from './constants/musicnotes.constant';
import { IMusicNote, StringName } from './types';

export * from './types';

export class MusicNotes {
  static getNoteFromFrequency(frequency: number): IMusicNote {
    let closestLower: IMusicNote = MUSIC_NOTES[0];
    let closestHigher: IMusicNote = MUSIC_NOTES[MUSIC_NOTES.length - 1];

    for (const musicNote of MUSIC_NOTES) {
      if (musicNote.hz < frequency) {
        closestLower = musicNote;
      }

      if (musicNote.hz > frequency) {
        closestHigher = musicNote;
        break; // going from low to high so we can stop here
      }
    }

    const distanceToLower = Math.abs(frequency - closestLower.hz);
    const distanceToHigher = Math.abs(frequency - closestHigher.hz);

    return Math.min(distanceToLower, distanceToHigher) === distanceToLower
      ? closestLower
      : closestHigher;
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

    return MUSIC_NOTES.slice(firstNoteIndex, lastNoteIndex);
  }
}
