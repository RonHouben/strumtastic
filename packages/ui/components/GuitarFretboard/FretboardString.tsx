import { FlatsOrSharps, IMusicNote, MusicNotes, StringName } from 'music-notes';
import { Fret } from './Fret';

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
  const musicNotes = MusicNotes.getNotesForString(stringName, numberOfFrets);

  return (
    <div id={`string-${stringName}`} className="flex justify-between">
      {musicNotes.map((note, i) => (
        <Fret
					key={i}
          flatsOrSharps={flatsOrSharps}
          musicNote={note}
          isPlayed={note === playedNote}
        />
      ))}
    </div>
  );
};
