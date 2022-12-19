import { IMusicNote } from 'music-notes';
import { GuitarFretboardString } from './FretboardString';
import { GuitarFretboardFretNumbers } from './FretNumbers';

interface Props {
  numberOfFrets: number;
  playedNote?: IMusicNote;
  notesToPlay: IMusicNote[];
}

export const GuitarFretboard = ({ numberOfFrets, playedNote, notesToPlay }: Props) => {
  return (
    <div id="guitar-fretboard-container" className="">
      <GuitarFretboardFretNumbers numberOfFrets={numberOfFrets} />
      <GuitarFretboardString
        stringName="E4"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        playedNote={playedNote}
        notesToPlay={notesToPlay}
      />
      <GuitarFretboardString
        stringName="B3"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        playedNote={playedNote}
        notesToPlay={notesToPlay}
      />
      <GuitarFretboardString
        stringName="G3"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        playedNote={playedNote}
        notesToPlay={notesToPlay}
      />
      <GuitarFretboardString
        stringName="D3"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        playedNote={playedNote}
        notesToPlay={notesToPlay}
      />
      <GuitarFretboardString
        stringName="A2"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        playedNote={playedNote}
        notesToPlay={notesToPlay}
      />
      <GuitarFretboardString
        stringName="E2"
        numberOfFrets={numberOfFrets}
        flatsOrSharps="sharps"
        playedNote={playedNote}
        notesToPlay={notesToPlay}
      />
    </div>
  );
};
