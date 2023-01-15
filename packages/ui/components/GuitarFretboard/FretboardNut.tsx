import { ExerciseMusicNote, FlatsOrSharps, IMusicNote } from 'music-notes';
import { Fret } from './Fret';
import { FretboardNote } from './FretboardNote';
import { GuitarFretboardViewType } from './types';

interface Props {
  musicNote: IMusicNote;
  isRoot: boolean;
  toBePlayed: boolean;
  onNoteClick?: (note: IMusicNote) => void;
  viewType: GuitarFretboardViewType;
  exerciseNoteNumber: number;
}

export const FretBoardNut = ({
  musicNote,
  isRoot,
  toBePlayed,
  onNoteClick,
  viewType,
  exerciseNoteNumber
}: Props) => {
  return (
    <Fret className="border-l-4 border-r-4 border-slate-400">
      <FretboardNote
        exerciseNoteNumber={exerciseNoteNumber}
        viewType={viewType}
        onNoteClick={onNoteClick}
        musicNote={musicNote}
        isRoot={isRoot}
        toBePlayed={toBePlayed}
      />
    </Fret>
  );
};
