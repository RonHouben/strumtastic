import { useRef } from 'react';
import SVGWrapper from './SVGWrapper';
import { SVGProps } from './types';

interface Props extends SVGProps {
  animationDuration: string;
}

export default function LoadingCircleSVG({ className, height, width, animationDuration }: Props) {
  return (
    <SVGWrapper
      id="loading-circle-svg"
      viewBox="0 0 100 100"
      className={className || ''}
      height={height}
      width={width}
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="10" cy="10" r="9">
        <animate
          attributeName="cy"
          values="10;40;70;90;70;40;10"
          keyTimes="0;0.15;0.30;0.45;0.60;0.75;1"
          dur={animationDuration}
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="30" cy="10" r="9">
        <animate
          attributeName="cy"
          values="10;40;70;90;70;40;10"
          keyTimes="0;0.15;0.30;0.45;0.60;0.75;1"
          dur={animationDuration}
          repeatCount="indefinite"
          begin="0.2s"
        />
      </circle>
      <circle cx="50" cy="10" r="9">
        <animate
          attributeName="cy"
          values="10;40;70;90;70;40;10"
          keyTimes="0;0.15;0.30;0.45;0.60;0.75;1"
          dur={animationDuration}
          repeatCount="indefinite"
          begin="0.4s"
        />
      </circle>
      <circle cx="70" cy="10" r="9">
        <animate
          attributeName="cy"
          values="10;40;70;90;70;40;10"
          keyTimes="0;0.15;0.30;0.45;0.60;0.75;1"
          dur={animationDuration}
          repeatCount="indefinite"
          begin="0.6s"
        />
      </circle>
      <circle cx="90" cy="10" r="9">
        <animate
          attributeName="cy"
          values="10;40;70;90;70;40;10"
          keyTimes="0;0.15;0.30;0.45;0.60;0.75;1"
          dur={animationDuration}
          repeatCount="indefinite"
          begin="0.8s"
        />
      </circle>
    </SVGWrapper>
  );
}
