'use client';

import { useClassNames } from '../../hooks/useClassNames';
import ErrorCicleSVG from './ErrorCircleSVG';
import GuitarAmpSVG from './GuitarAmpSVG';
import LoadingCircleSVG from './LoadingCircleSVG';

interface Props {
  isLoading?: boolean;
  isError?: boolean;
  isDone?: boolean;
}

export default function PluginGuitarSVG({ isLoading, isDone, isError }: Props) {
  const { classNames } = useClassNames();

  return (
    <div className="h-full">
      {!isLoading && !isError && (
        <GuitarAmpSVG
          className={classNames(
            'h-full',
            isDone ? '!fill-green-400 !stroke-green-400' : ''
          )}
        />
      )}

      {isLoading && (
        <LoadingCircleSVG animationDuration="1.5s" className="h-full" />
      )}

      {isError && (
        <ErrorCicleSVG className="!stroke-error-500 !fill-error-500 dark:!stroke-error-800 dark:!fill-error-800 h-full" />
      )}
    </div>
  );
}
