import { IMusicNote, MusicKey, STRING_NAMES } from 'music-notes';
import { FretboardString } from './FretboardString';
import { FretboardFretNumbers } from './FretNumbers';
import { FretboardMarkers } from './FretboardMarker';
import { GuitarFretboardViewType } from './types';

interface Props {
  numberOfFrets: number;
  notesToPlay: IMusicNote[];
  musicKey: MusicKey;
  onNoteClick?: (note: IMusicNote) => void;
  viewType: GuitarFretboardViewType;
}

export const GuitarFretboard = ({
  numberOfFrets,
  notesToPlay,
  musicKey,
  onNoteClick,
  viewType
}: Props) => {
  return (
    <div
      id="guitar-fretboard-container"
      className="mb-5 flex min-w-full flex-col overflow-scroll scroll-smooth pb-5 scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-primary-500 dark:scrollbar-track-slate-800 dark:scrollbar-thumb-primary-800"
    >
      <FretboardFretNumbers numberOfFrets={numberOfFrets} />
      {/* need to spread to reverse because STRING_NAMES is readonly */}
      {[...STRING_NAMES].reverse().map((stringName) => (
        <FretboardString
          viewType={viewType}
          onNoteClick={onNoteClick}
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
