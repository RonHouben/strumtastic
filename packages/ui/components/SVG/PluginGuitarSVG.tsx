'use client';

import { useClassNames } from '../../hooks/useClassNames';
import CheckMarkCircleSVG from './CheckMarkCircleSVG';
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
            isDone
              ? 'fill-green-300 stroke-green-300'
              : 'stroke-primary-500 fill-primary-500 '
          )}
        />
      )}

      {isLoading && (
        <LoadingCircleSVG
          animationDuration="1.5s"
          className="stroke-primary-500 fill-primary-500 h-full"
        />
      )}

      {isError && (
        <ErrorCicleSVG className="stroke-error-500 fill-error-500 h-full" />
      )}
    </div>
  );
}
