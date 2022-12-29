import { FlatsOrSharps, IMusicNote } from 'music-notes';
import { Fret } from './Fret';
import { FretboardNote } from './FretboardNote';

interface Props {
  musicNote: IMusicNote;
  showFlatsOrSharps: FlatsOrSharps;
  isRoot: boolean;
  toBePlayed: boolean;
}

export const FretBoardNut = ({
  musicNote,
  showFlatsOrSharps,
  isRoot,
  toBePlayed
}: Props) => {
  return (
    <Fret className="border-l-4 border-r-4 border-slate-400">
      <FretboardNote
        showFlatsOrSharps={showFlatsOrSharps}
        musicNote={musicNote}
        isRoot={isRoot}
        toBePlayed={toBePlayed}
      />
    </Fret>
  );
};
