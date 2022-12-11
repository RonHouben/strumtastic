import { FlatsOrSharps, IMusicNote, MusicNotes } from 'music-notes';
import { Note } from './Note';

interface Props {
  musicNote: IMusicNote;
  flatsOrSharps: FlatsOrSharps;
  isPlayed: boolean;
  isRoot: boolean;
}

export const Fret = ({ musicNote, flatsOrSharps, isPlayed, isRoot }: Props) => {
  return (
    <div className='w-[2em]'>
      <Note
        noteName={MusicNotes.getNoteName(flatsOrSharps, musicNote)}
        isPlayed={isPlayed}
        isRoot={isRoot}
      />
    </div>
  );
};
