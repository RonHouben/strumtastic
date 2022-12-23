import { Row } from './Row';

interface Props {
  numberOfFrets: number;
}

export const GuitarFretboardFretNumbers = ({ numberOfFrets }: Props) => {
  return (
    <Row>
      {new Array(numberOfFrets + 1).fill(1).map((_, fretNumber) => (
        <div key={fretNumber} className="m-2 flex w-12 justify-center">
          <span className="text-sm">{fretNumber !== 0 ? fretNumber : ''}</span>
        </div>
      ))}
    </Row>
  );
};
