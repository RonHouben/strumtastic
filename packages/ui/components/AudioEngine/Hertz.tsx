interface Props {
  hertz: number;
}

export const Hertz = ({ hertz }: Props) => {
  return <span>hertz: {Math.floor(hertz * 100) / 100}</span>;
};
