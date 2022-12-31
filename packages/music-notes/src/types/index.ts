import { get } from '@tonaljs/note';
import { STRING_NAMES } from '../constants';

type TonalNote = ReturnType<typeof get>

export type IMusicNote = TonalNote;

export type StringName = typeof STRING_NAMES[number];
export type FlatsOrSharps = 'flats' | 'sharps';