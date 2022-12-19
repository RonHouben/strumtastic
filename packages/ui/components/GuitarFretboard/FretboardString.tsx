import { FlatsOrSharps, IMusicNote, MusicNotes, StringName } from 'music-notes';
import { useMemo } from 'react';
import { Fret } from './Fret';
import { Row } from './Row';

interface Props {
  stringName: StringName;
  numberOfFrets: number;
  flatsOrSharps: FlatsOrSharps;
  currentlyPlayedNote?: IMusicNote;
  notesToPlay: IMusicNote[];
}

export const GuitarFretboardString = ({
  numberOfFrets,
  stringName,
  flatsOrSharps,
  currentlyPlayedNote,
  notesToPlay
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
          isCurrentlyPlaying={note === currentlyPlayedNote}
          isPlayed={note === currentlyPlayedNote}
          isRoot={true}
          toBePlayed={notesToPlay.includes(note)}
        />
      ))}
    </Row>
  );
};
