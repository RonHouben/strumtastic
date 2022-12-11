import { FlatsOrSharps, IMusicNote } from 'music-notes';
import { Note } from './Note';

interface Props {
	musicNote: IMusicNote;
	flatsOrSharps: FlatsOrSharps;
	isPlayed: boolean;
}

export const Fret = ({ musicNote, flatsOrSharps, isPlayed }: Props) => {
  if (musicNote.names.natural) {
    return <Note noteName={musicNote.names.natural} isPlayed={isPlayed} />;
  }
  if (flatsOrSharps === 'flats' && musicNote.names.flat) {
    return <Note noteName={musicNote.names.flat} isPlayed={isPlayed} />;
  }
  if (flatsOrSharps === 'sharps' && musicNote.names.sharp) {
    return <Note noteName={musicNote.names.sharp} isPlayed={isPlayed} />;
  }

	return <Note noteName='?' isPlayed={isPlayed}/>
};
