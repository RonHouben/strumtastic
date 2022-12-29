import { IMusicNote, STRING_NAMES } from 'music-notes';
import { FretboardString } from './FretboardString';
import { FretboardFretNumbers } from './FretNumbers';
import { FretboardMarkers } from './FretboardMarker';

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
    <div
      id="guitar-fretboard-container"
      className="scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-primary-500 dark:scrollbar-track-slate-800 dark:scrollbar-thumb-secondary-800 mb-5 flex min-w-full flex-col overflow-scroll scroll-smooth pb-5"
    >
      <FretboardFretNumbers numberOfFrets={numberOfFrets} />
      {/* need to spread to reverse because STRING_NAMES is readonly */}
      {[...STRING_NAMES].reverse().map((stringName) => (
        <FretboardString
          key={stringName}
          stringName={stringName}
          numberOfFrets={numberOfFrets}
          showFlatsOrSharps="sharps"
          notesToPlay={notesToPlay}
          musicKey={musicKey}
        />
      ))}
      <FretboardMarkers numberOfFrets={numberOfFrets} />
    </div>
  );
};
