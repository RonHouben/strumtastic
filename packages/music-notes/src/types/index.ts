import { STRING_NAMES } from '../constants';

export interface IMusicNote {
  names: MusicNoteName;
  hz: number;
  positions: GuitarNotePosition[];
  octave: number;
}

interface MusicNoteName {
  natural?: string;
  sharp?: string;
  flat?: string;
}

interface GuitarNotePosition {
  string: StringName;
  fret: number;
}

export type StringName = typeof STRING_NAMES[number];
export type FlatsOrSharps = 'flats' | 'sharps';
