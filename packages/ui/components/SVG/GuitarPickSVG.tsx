import SVGWrapper from './SVGWrapper';
import { SVGProps } from './types';

interface Props extends SVGProps {}

export default function GuitarPickSVG({
  className,
  height,
  preserveAspectRatio,
  width
}: Props) {
  return (
    <SVGWrapper
      id="guitar-pick-svg"
      viewBox="0 0 1079.000000 1280.000000"
      className={className}
      height={height}
      width={width}
      preserveAspectRatio={preserveAspectRatio || 'xMidYMid meet'}
    >
      <g
        transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path
          d="M4830 12794 c-935 -43 -1710 -175 -2430 -414 -733 -243 -1301 -570
-1720 -990 -400 -400 -620 -857 -671 -1390 -15 -160 1 -536 32 -775 80 -608
384 -1553 856 -2660 909 -2132 2275 -4560 3245 -5774 436 -544 765 -812 970
-788 401 48 1423 1247 2635 3092 1645 2505 2917 5066 2998 6035 3 41 14 131
23 200 26 191 23 516 -7 683 -66 378 -206 687 -459 1017 -87 113 -350 374
-487 484 -137 109 -410 292 -575 384 -863 481 -1994 781 -3310 877 -200 15
-923 27 -1100 19z"
        />
      </g>
    </SVGWrapper>
  );
}
