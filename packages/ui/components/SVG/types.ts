import { Size } from "../../types";

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
  size: Size;
  className?: string;
  preserveAspectRatio?: PreserveAspectRatio;
}