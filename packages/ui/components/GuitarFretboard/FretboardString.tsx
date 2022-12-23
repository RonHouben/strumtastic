import { FlatsOrSharps, IMusicNote, StringName } from 'music-notes';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { Fret } from './Fret';
import { FretBoardNut } from './FretboardNut';
import { Row } from './Row';
import { String } from './String';

interface Props {
  stringName: StringName;
  numberOfFrets: number;
  showFlatsOrSharps: FlatsOrSharps;
  notesToPlay: IMusicNote[];
  musicKey: string;
}

export const GuitarFretboardString = ({
  numberOfFrets,
  stringName,
  showFlatsOrSharps,
  notesToPlay,
  musicKey
}: Props) => {
  const { getMusicNotesForString, getNoteName } = useMusicNotes();

  return (
    <Row>
      {getMusicNotesForString(stringName, numberOfFrets).map((musicNote, i) => {
        const toBePlayed = notesToPlay.includes(musicNote);
        const isRoot = musicKey === getNoteName(showFlatsOrSharps, musicNote);

        return (
          <div key={i}>
            <String>
              {i === 0 ? (
                <FretBoardNut
                  musicNote={musicNote}
                  showFlatsOrSharps={showFlatsOrSharps}
                  toBePlayed={toBePlayed}
                  isRoot={isRoot}
                />
              ) : (
                <Fret
                  showFlatsOrSharps={showFlatsOrSharps}
                  musicNote={musicNote}
                  isRoot={isRoot}
                  toBePlayed={toBePlayed}
                  className="border-slate-400 border-x-2"
                />
              )}
            </String>
          </div>
        );
      })}
    </Row>
  );
};
