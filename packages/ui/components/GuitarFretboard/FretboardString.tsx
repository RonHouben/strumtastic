import { FlatsOrSharps, IMusicNote, StringName } from 'music-notes';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { Fret } from './Fret';
import { Row } from './Row';

interface Props {
  stringName: StringName;
  numberOfFrets: number;
  showFlatsOrSharps: FlatsOrSharps;
  notesToPlay: IMusicNote[];
}

export const GuitarFretboardString = ({
  numberOfFrets,
  stringName,
  showFlatsOrSharps,
  notesToPlay
}: Props) => {
  const { getMusicNotesForString } = useMusicNotes();

  return (
    <Row>
      {getMusicNotesForString(stringName, numberOfFrets).map((note, i) => (
        <Fret
          key={i}
          showFlatsOrSharps={showFlatsOrSharps}
          musicNote={note}
          isRoot={true}
          toBePlayed={notesToPlay.includes(note)}
        />
      ))}
    </Row>
  );
};
