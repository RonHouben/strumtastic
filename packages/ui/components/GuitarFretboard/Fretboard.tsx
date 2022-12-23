import { IMusicNote } from 'music-notes';
import { GuitarFretboardString } from './FretboardString';
import { GuitarFretboardFretNumbers } from './FretNumbers';
import { STRING_NAMES } from 'music-notes/constants';
import { GuitarFretboardMarkers } from './FretboardMarker';

interface Props {
  numberOfFrets: number;
  notesToPlay: IMusicNote[];
  musicKey: string;
}

export const GuitarFretboard = ({
  numberOfFrets,
  notesToPlay,
  musicKey
}: Props) => {
  return (
    <div id="guitar-fretboard-container" className="prose min-w-full mb-5">
      <GuitarFretboardFretNumbers numberOfFrets={numberOfFrets} />
      <div
        id="guitar-fretboard-strings-container"
        className="rounded-sm bg-slate-500 p-1 shadow-2xl"
      >
        {/* need to spread to reverse because STRING_NAMES is readonly */}
        {[...STRING_NAMES].reverse().map((stringName) => (
          <GuitarFretboardString
            key={stringName}
            stringName={stringName}
            numberOfFrets={numberOfFrets}
            showFlatsOrSharps="sharps"
            notesToPlay={notesToPlay}
            musicKey={musicKey}
          />
        ))}
      </div>
      <GuitarFretboardMarkers numberOfFrets={numberOfFrets}/>
    </div>
  );
};
