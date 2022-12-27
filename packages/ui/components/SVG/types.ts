type PreserveAspectRatio =
  | "none"
  | "xMinYMin"
  | "xMidYMin"
  | "xMaxYMin"
  | "xMinYMid"
  | "xMidYMid"
  | "xMaxYMid"
  | "xMinYMax"
  | "xMidYMax"
  | "xMaxYMax"
  | string;

export interface SVGProps {
  height?: number | string;
  width?: number | string;
  className?: string;
  preserveAspectRatio?: PreserveAspectRatio;
}