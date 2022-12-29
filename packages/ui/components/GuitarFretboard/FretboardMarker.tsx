import { Fret } from './Fret';
import { FretboardRow } from './FretboardRow';

interface Props {
  numberOfFrets: number;
}

export const FretboardMarkers = ({ numberOfFrets }: Props) => {
  return (
    <FretboardRow id="fretboard-marker-container">
      {new Array(numberOfFrets + 1).fill(1).map((_, fretNumber) => {
        const isSingleMarker =
          fretNumber === 5 ||
          fretNumber === 7 ||
          fretNumber === 9 ||
          fretNumber === 15 ||
          fretNumber === 17;

        const isMultipleMarker = fretNumber === 12;

        return (
          <Fret key={fretNumber}>
            <svg
              id="guitar-fretboard-marker"
              key={fretNumber}
              className="h-4 w-12 fill-slate-700"
            >
              {isSingleMarker && <circle cx="1.6rem" cy="50%" r=".25rem" />}
              {isMultipleMarker && (
                <>
                  <circle cx="1rem" cy="50%" r=".25rem" />
                  <circle cx="2.0rem" cy="50%" r=".25rem" />
                </>
              )}
            </svg>
          </Fret>
        );
      })}
    </FretboardRow>
  );
};
