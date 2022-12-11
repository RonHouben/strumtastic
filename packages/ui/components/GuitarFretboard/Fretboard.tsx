import { IMusicNote } from 'music-notes';
import { GuitarFretboardString } from './FretboardString';
import { GuitarFretboardFretNumbers } from './FretNumbers';

interface Props {
  numberOfFrets: number;
  playedNote?: IMusicNote;
}

export const GuitarFretboard = ({ numberOfFrets, playedNote }: Props) => {
  return (
    <div id="guitar-fretboard-container" className="">
      <GuitarFretboardFretNumbers numberOfFrets={numberOfFrets} />
      <GuitarFretboardString
        stringName="E4"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        playedNote={playedNote}
      />
      <GuitarFretboardString
        stringName="B3"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        playedNote={playedNote}
      />
      <GuitarFretboardString
        stringName="G3"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        playedNote={playedNote}
      />
      <GuitarFretboardString
        stringName="D3"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        playedNote={playedNote}
      />
      <GuitarFretboardString
        stringName="A2"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        playedNote={playedNote}
      />
      <GuitarFretboardString
        stringName="E2"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        playedNote={playedNote}
      />
    </div>
  );
};
