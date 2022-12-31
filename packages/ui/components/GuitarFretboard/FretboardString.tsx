import { FlatsOrSharps, IMusicNote, StringName } from 'music-notes';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { Fret } from './Fret';
import { FretBoardNut } from './FretboardNut';
import { FretboardRow } from './FretboardRow';
import { FretboardNote } from './FretboardNote';

interface Props {
  stringName: StringName;
  numberOfFrets: number;
  showFlatsOrSharps: FlatsOrSharps;
  notesToPlay: IMusicNote[];
  musicKey: string;
}

export const FretboardString = ({
  numberOfFrets,
  stringName,
  showFlatsOrSharps,
  notesToPlay,
  musicKey
}: Props) => {
  const { getMusicNotesForString } = useMusicNotes();

  return (
    <FretboardRow id="fredboard-strings-container">
      {getMusicNotesForString({
        startNote: stringName,
        numberOfFrets,
        sharps: showFlatsOrSharps === 'sharps'
      }).map((musicNote, i) => {
        const toBePlayed = notesToPlay.some((noteToPlay) => noteToPlay.pc === musicNote.pc);
        const isRoot = musicKey === musicNote.pc //&& toBePlayed;

        return (
          <div id="fretboard-string" key={i}>
            {i === 0 ? (
              <FretBoardNut
                musicNote={musicNote}
                showFlatsOrSharps={showFlatsOrSharps}
                toBePlayed={toBePlayed}
                isRoot={isRoot}
              />
            ) : (
              <Fret className="border-slate-400">
                <FretboardNote
                  musicNote={musicNote}
                  showFlatsOrSharps={showFlatsOrSharps}
                  isRoot={isRoot}
                  toBePlayed={toBePlayed}
                />
              </Fret>
            )}
          </div>
        );
      })}
    </FretboardRow>
  );
};
