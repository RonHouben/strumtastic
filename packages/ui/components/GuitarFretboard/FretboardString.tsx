import { FlatsOrSharps, IMusicNote, StringName } from 'music-notes';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { Fret } from './Fret';
import { Row } from './Row';

interface Props {
  stringName: StringName;
  numberOfFrets: number;
  showFlatsOrSharps: FlatsOrSharps;
  currentlyPlayedNote?: IMusicNote;
  notesToPlay: IMusicNote[];
}

export const GuitarFretboardString = ({
  numberOfFrets,
  stringName,
  showFlatsOrSharps,
  currentlyPlayedNote,
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
          isCurrentlyPlaying={note === currentlyPlayedNote}
          isPlayed={note === currentlyPlayedNote}
          isRoot={true}
          toBePlayed={notesToPlay.includes(note)}
        />
      ))}
    </Row>
  );
};
