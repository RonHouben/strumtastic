import { FlatsOrSharps, IMusicNote } from 'music-notes';
import { classNames } from '../../utils';
import { Note } from './Note';

interface Props {
  musicNote: IMusicNote;
  showFlatsOrSharps: FlatsOrSharps;
  isRoot: boolean;
  toBePlayed: boolean;
  className?: string;
}

export const Fret = ({
  musicNote,
  showFlatsOrSharps,
  isRoot,
  toBePlayed,
  className
}: Props) => {
  return (
    <div
      className={classNames('my-1 flex w-12 justify-center', className || '')}
    >
      <Note
        isRoot={isRoot}
        toBePlayed={toBePlayed}
        musicNote={musicNote}
        showFlatsOrSharps={showFlatsOrSharps}
      />
    </div>
  );
};
