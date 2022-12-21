import { FlatsOrSharps, IMusicNote, MusicNotes, StringName } from 'music-notes';
import { useMemo } from 'react';

interface UseMusicNotesResult {
	allMusicNotes: IMusicNote[];
	getMusicNotesByNoteNames: (noteNames: string[], startOctave: number, numberOfOctaves: number) => IMusicNote[];
	getMusicNoteByNoteName: (noteName: string) => IMusicNote | undefined;
	getNoteName: (flatOrSharp: FlatsOrSharps, musicNote: IMusicNote) => string;
	getMusicNotesForString: (stringName: StringName, numberOfFrets: number) => IMusicNote[];
	getMusicNoteFromFrequency: (frequency: number) => IMusicNote | undefined;
}

export function useMusicNotes(): UseMusicNotesResult {
	const allMusicNotes = useMemo(MusicNotes.getAllMusicNotes, []);


	return {
		allMusicNotes,
		getMusicNotesByNoteNames: MusicNotes.getMusicNotesByNames,
		getMusicNoteByNoteName: MusicNotes.getMusicNoteByName,
		getNoteName: MusicNotes.getNoteName,
		getMusicNotesForString: MusicNotes.getNotesForString,
		getMusicNoteFromFrequency: MusicNotes.getMusicNoteFromFrequency,
	}
}