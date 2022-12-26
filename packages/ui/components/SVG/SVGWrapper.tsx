import { SVGProps } from './types';

interface Props extends SVGProps {
  id: string;
  viewBox: string;
  children: React.ReactNode;
}

export default function SVGWrapper({
  id,
  height,
  width,
  viewBox,
  className,
  children
}: Props) {
  return (
    <svg
      className={className}
      version="1.1"
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      height={height}
      width={width}
    >
      {children}
    </svg>
  );
}
