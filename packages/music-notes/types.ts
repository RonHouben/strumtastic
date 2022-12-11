export interface IMusicNote {
  names: MusicNoteName;
  hz: number;
  positions: GuitarNotePosition[];
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

export type StringName = 'E2' | 'A2' | 'D3' | 'G3' | 'B3' | 'E4';
export type FlatsOrSharps = 'flats' | 'sharps';
