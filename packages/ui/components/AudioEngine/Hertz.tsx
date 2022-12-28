import { Typography } from "../Typography";

interface Props {
  hertz: number;
  className?: string;
}

export const Hertz = ({ hertz, className }: Props) => {
  return (
    <Typography variant="p" className={className}>
      {hertz === -1 || Number.isNaN(hertz) ? '-' : Math.round(hertz)} Hz
    </Typography>
  );
};
