interface Props {
  numberOfFrets: number;
}

export const GuitarFretboardFretNumbers = ({ numberOfFrets }: Props) => {
  return (
    <div id="fret-numbers" className="flex justify-between">
      {new Array(numberOfFrets + 1).fill(1).map((_, i) => (
        <div key={i}>{i}</div>
      ))}
    </div>
  );
};
