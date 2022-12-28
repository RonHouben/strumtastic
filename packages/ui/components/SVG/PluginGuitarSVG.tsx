'use client';

import { useGlobalState } from '../../hooks/useGlobalState';
import CheckMarkCircleSVG from './CheckMarkCircleSVG';
import ErrorCicleSVG from './ErrorCircleSVG';
import GuitarAmpSVG from './GuitarAmpSVG';
import LoadingCircleSVG from './LoadingCircleSVG';

interface Props {
  disabled: boolean;
}

export default function PluginGuitarSVG({ disabled }: Props) {
  const { audioEngine } = useGlobalState();

  return (
    <div className="h-full">
      {audioEngine.state.matches('unitialized') && (
        <GuitarAmpSVG className="stroke-primary-500 fill-primary-500 h-full" />
      )}

      {audioEngine.state.matches('initializing') &&
        !audioEngine.state.matches('initializing.deniedMicrophoneAccess') && (
          <LoadingCircleSVG
            animationDuration="1.5s"
            className="stroke-primary-500 fill-primary-500 h-full"
          />
        )}

      {disabled && (
        <CheckMarkCircleSVG className="h-full fill-green-300 stroke-green-300" />
      )}

      {audioEngine.state.matches('initializing.deniedMicrophoneAccess') && (
        <ErrorCicleSVG className="stroke-primary-500 fill-primary-500 h-full" />
      )}
    </div>
  );
}
