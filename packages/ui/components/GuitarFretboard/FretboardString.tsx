import { FlatsOrSharps, IMusicNote, MusicKey, StringName } from 'music-notes';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { Fret } from './Fret';
import { FretBoardNut } from './FretboardNut';
import { FretboardRow } from './FretboardRow';
import { FretboardNote } from './FretboardNote';
import { GuitarFretboardViewType } from './types';
import { useMemo } from 'react';

interface Props {
  stringName: StringName;
  numberOfFrets: number;
  notesToPlay: IMusicNote[];
  musicKey: MusicKey;
  onNoteClick?: (note: IMusicNote) => void;
  viewType: GuitarFretboardViewType;
  showFlatsOrSharps: FlatsOrSharps;
}

export const FretboardString = ({
  numberOfFrets,
  stringName,
  notesToPlay,
  musicKey,
  onNoteClick,
  viewType,
  showFlatsOrSharps
}: Props) => {
  const { getMusicNotesForString, transformMusicNotesAccidentals } =
    useMusicNotes();

  const notesToPlayWithTransformedAccidentals = useMemo<IMusicNote[]>(
    () => transformMusicNotesAccidentals(notesToPlay, showFlatsOrSharps),
    [showFlatsOrSharps, notesToPlay, transformMusicNotesAccidentals]
  );

  return (
    <FretboardRow id="fredboard-strings-container">
      {getMusicNotesForString({
        startNote: stringName,
        numberOfFrets,
        flatsOrSharps: showFlatsOrSharps
      }).map((musicNote, i) => {
        const toBePlayed = notesToPlayWithTransformedAccidentals.some(
          (noteToPlay) => noteToPlay.name === musicNote.name
        );

        const isRoot = musicKey.split(' ')[0] === musicNote.pc && toBePlayed;

        const exerciseNoteNumber =
          notesToPlayWithTransformedAccidentals.findIndex(
            (noteToPlay) => noteToPlay.name === musicNote.name
          ) + 1;

        return (
          <div id="fretboard-string" key={i}>
            {i === 0 ? (
              <FretBoardNut
                viewType={viewType}
                onNoteClick={onNoteClick}
                musicNote={musicNote}
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
