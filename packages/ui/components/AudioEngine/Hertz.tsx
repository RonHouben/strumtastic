interface Props {
  hertz: number;
}

export const Hertz = ({ hertz }: Props) => {
  return <span>hertz: {hertz === -1 ? '--' : Math.round(hertz)}Hz</span>;
};
