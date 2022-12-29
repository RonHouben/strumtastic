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
          <span className="dark:text-slate-500 text-sm">
            {fretNumber !== 0 ? fretNumber : ''}
          </span>
        </Fret>
      ))}
    </FretboardRow>
  );
};
