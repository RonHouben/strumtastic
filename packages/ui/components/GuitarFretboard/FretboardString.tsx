import {
  ExerciseMusicNote,
  FlatsOrSharps,
  IMusicNote,
  MusicKey,
  StringName
} from 'music-notes';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { Fret } from './Fret';
import { FretBoardNut } from './FretboardNut';
import { FretboardRow } from './FretboardRow';
import { FretboardNote } from './FretboardNote';
import { GuitarFretboardViewType } from './types';

interface Props {
  stringName: StringName;
  numberOfFrets: number;
  showFlatsOrSharps: FlatsOrSharps;
  notesToPlay: IMusicNote[];
  musicKey: MusicKey;
  onNoteClick?: (note: IMusicNote) => void;
  viewType: GuitarFretboardViewType;
}

export const FretboardString = ({
  numberOfFrets,
  stringName,
  showFlatsOrSharps,
  notesToPlay,
  musicKey,
  onNoteClick,
  viewType
}: Props) => {
  const { getMusicNotesForString } = useMusicNotes();

  return (
    <FretboardRow id="fredboard-strings-container">
      {getMusicNotesForString({
        startNote: stringName,
        numberOfFrets,
        sharps: showFlatsOrSharps === 'sharps'
      }).map((musicNote, i) => {
        const toBePlayed = notesToPlay.some(
          (noteToPlay) => noteToPlay.name === musicNote.name
        );

        const isRoot = musicKey.split(' ')[0] === musicNote.name;

        const exerciseNoteNumber = notesToPlay.findIndex(
          (noteToPlay) => noteToPlay.name === musicNote.name
        ) + 1;

        return (
          <div id="fretboard-string" key={i}>
            {i === 0 ? (
              <FretBoardNut
                viewType={viewType}
                onNoteClick={onNoteClick}
                musicNote={musicNote}
                showFlatsOrSharps={showFlatsOrSharps}
                toBePlayed={toBePlayed}
                isRoot={isRoot}
                exerciseNoteNumber={exerciseNoteNumber}
              />
            ) : (
              <Fret className="border-slate-400">
                <FretboardNote
                  viewType={viewType}
                  onNoteClick={onNoteClick}
                  musicNote={musicNote}
                  showFlatsOrSharps={showFlatsOrSharps}
                  isRoot={isRoot}
                  toBePlayed={toBePlayed}
                  exerciseNoteNumber={exerciseNoteNumber}
                />
              </Fret>
            )}
          </div>
        );
      })}
    </FretboardRow>
  );
};
