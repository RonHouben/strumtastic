import { FlatsOrSharps, IMusicNote, MusicNotes } from 'music-notes';
import { Note } from './Note';

interface Props {
  musicNote: IMusicNote;
  flatsOrSharps: FlatsOrSharps;
  isCurrentlyPlaying: boolean;
  isPlayed: boolean;
  isRoot: boolean;
  toBePlayed: boolean;
}

export const Fret = ({ musicNote, flatsOrSharps, isCurrentlyPlaying, isPlayed, isRoot, toBePlayed }: Props) => {
  return (
    <div className='w-[2em]'>
      <Note
        noteName={MusicNotes.getNoteName(flatsOrSharps, musicNote)}
        isCurrentlyPlaying={isCurrentlyPlaying}
        isPlayed={isPlayed}
        isRoot={isRoot}
        toBePlayed={toBePlayed}
      />
    </div>
  );
};
