interface Props {
  hertz: number;
}

export const Hertz = ({ hertz }: Props) => {
  return (
    <span>
      hertz: {hertz === -1 || Number.isNaN(hertz) ? '--' : Math.round(hertz)}Hz
    </span>
  );
};
