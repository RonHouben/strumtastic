import { FlatsOrSharps, IMusicNote, MusicNotes, StringName } from 'music-notes';
import { useMemo } from 'react';
import { Fret } from './Fret';
import { Row } from './Row';

interface Props {
  stringName: StringName;
  numberOfFrets: number;
  flatsOrSharps: FlatsOrSharps;
  playedNote?: IMusicNote;
}

export const GuitarFretboardString = ({
  numberOfFrets,
  stringName,
  flatsOrSharps,
  playedNote
}: Props) => {
  const musicNotes = useMemo(
    () => MusicNotes.getNotesForString(stringName, numberOfFrets),
    [stringName, numberOfFrets]
  );

  return (
    <Row>
      {musicNotes.map((note, i) => (
        <Fret
          key={i}
          flatsOrSharps={flatsOrSharps}
          musicNote={note}
          isPlayed={note === playedNote}
          isRoot={true}
        />
      ))}
    </Row>
  );
};
