import { MusicNotes } from 'music-notes';

export function useMusicNotes() {

	return {
		getAllMusicNotes: MusicNotes.getAllMusicNotes
	}
}