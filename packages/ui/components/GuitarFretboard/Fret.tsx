import { FlatsOrSharps, IMusicNote } from 'music-notes';
import { useClassNames } from '../../hooks/useClassNames';
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
  const { classNames } = useClassNames();

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
