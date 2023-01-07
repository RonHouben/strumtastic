import { get } from '@tonaljs/note';
import { STRING_NAMES } from '../constants';

type TonalNote = ReturnType<typeof get>;
type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type NoteNameWithoutOctave =
  | 'C'
  | 'C#'
  | 'D'
  | 'D#'
  | 'E'
  | 'F'
  | 'F#'
  | 'G'
  | 'G#'
  | 'A'
  | 'A#'
  | 'B';

export type IMusicNote = TonalNote;
export type NoteNameWithOctave = `${NoteNameWithoutOctave}${Octave}` | string;
export type StringName = typeof STRING_NAMES[number];
export type FlatsOrSharps = 'flats' | 'sharps';
export type MusicKey =
  | `${NoteNameWithoutOctave} major`
  | `${NoteNameWithoutOctave} minor`
  // | string;
