import { Fret } from './Fret';
import { FretboardRow } from './FretboardRow';

interface Props {
  numberOfFrets: number;
}

export const FretboardFretNumbers = ({ numberOfFrets }: Props) => {
  return (
    <FretboardRow id="fretboard-numbers-container">
      {new Array(numberOfFrets + 1).fill(1).map((_, fretNumber) => (
        <Fret key={fretNumber}>
          <span className="dark:text-primary-50 text-sm">
            {fretNumber !== 0 ? fretNumber : ''}
          </span>
        </Fret>
        // <div id='fretboard-number' key={fretNumber} className="m-2 flex w-12 justify-center">
        // </div>
      ))}
    </FretboardRow>
  );
};
