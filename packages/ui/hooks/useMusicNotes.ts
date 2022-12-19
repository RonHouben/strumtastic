import { IMusicNote, MusicNotes } from 'music-notes';
import { useMemo } from 'react';

interface UseMusicNotesResult {
	musicNotes: IMusicNote[];
}

export function useMusicNotes(): UseMusicNotesResult {
	const musicNotes = useMemo(MusicNotes.getAllMusicNotes, []);

	return {
		musicNotes
	}
}