import { IMusicNote } from 'music-notes';
import { GuitarFretboardString } from './FretboardString';
import { GuitarFretboardFretNumbers } from './FretNumbers';

interface Props {
  numberOfFrets: number;
  currentlyPlayedNote?: IMusicNote;
  notesToPlay: IMusicNote[];
}

export const GuitarFretboard = ({ numberOfFrets, currentlyPlayedNote, notesToPlay }: Props) => {
  return (
    <div id="guitar-fretboard-container" className="">
      <GuitarFretboardFretNumbers numberOfFrets={numberOfFrets} />
      <GuitarFretboardString
        stringName="E4"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        currentlyPlayedNote={currentlyPlayedNote}
        notesToPlay={notesToPlay}
      />
      <GuitarFretboardString
        stringName="B3"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        currentlyPlayedNote={currentlyPlayedNote}
        notesToPlay={notesToPlay}
      />
      <GuitarFretboardString
        stringName="G3"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        currentlyPlayedNote={currentlyPlayedNote}
        notesToPlay={notesToPlay}
      />
      <GuitarFretboardString
        stringName="D3"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        currentlyPlayedNote={currentlyPlayedNote}
        notesToPlay={notesToPlay}
      />
      <GuitarFretboardString
        stringName="A2"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        currentlyPlayedNote={currentlyPlayedNote}
        notesToPlay={notesToPlay}
      />
      <GuitarFretboardString
        stringName="E2"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        currentlyPlayedNote={currentlyPlayedNote}
        notesToPlay={notesToPlay}
      />
    </div>
  );
};
