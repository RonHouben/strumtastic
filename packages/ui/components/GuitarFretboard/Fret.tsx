import { FlatsOrSharps, IMusicNote, } from 'music-notes';
import { Note } from './Note';

interface Props {
  musicNote: IMusicNote;
  showFlatsOrSharps: FlatsOrSharps;
  isCurrentlyPlaying: boolean;
  isPlayed: boolean;
  isRoot: boolean;
  toBePlayed: boolean;
}

export const Fret = ({ musicNote, showFlatsOrSharps, isCurrentlyPlaying, isPlayed, isRoot, toBePlayed }: Props) => {
  
  return (
    <div className='w-[2em]'>
      <Note
        isCurrentlyPlaying={isCurrentlyPlaying}
        isRoot={isRoot}
        toBePlayed={toBePlayed}
        musicNote={musicNote}
        showFlatsOrSharps={showFlatsOrSharps}
      />
    </div>
  );
};
