import { Row } from './Row';

interface Props {
  numberOfFrets: number;
}

export const GuitarFretboardFretNumbers = ({ numberOfFrets }: Props) => {
  return (
    <Row>
      {new Array(numberOfFrets + 1).fill(1).map((_, i) => (
        <div className="w-[2em]">
          <span key={i}>{i}</span>
        </div>
      ))}
    </Row>
  );
};
