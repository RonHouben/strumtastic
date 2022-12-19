import { FlatsOrSharps, IMusicNote, } from 'music-notes';
import { Note } from './Note';

interface Props {
  musicNote: IMusicNote;
  showFlatsOrSharps: FlatsOrSharps;
  isRoot: boolean;
  toBePlayed: boolean;
}

export const Fret = ({ musicNote, showFlatsOrSharps, isRoot, toBePlayed }: Props) => {
  
  return (
    <div className='w-[2em]'>
      <Note
        isRoot={isRoot}
        toBePlayed={toBePlayed}
        musicNote={musicNote}
        showFlatsOrSharps={showFlatsOrSharps}
      />
    </div>
  );
};
