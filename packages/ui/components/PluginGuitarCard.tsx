'use client';

import { useAudioEngine } from '@audio-engine/react';
import { useClassNames } from '../hooks/useClassNames';
import Button from './Button';
import { Card, CardMedia, CardContent } from './Card';
import Link from './Link';
import { CheckMarkCircleSVG, GuitarAmpSVG, LoadingCircleSVG } from './SVG';
import ErrorCicleSVG from './SVG/ErrorCircleSVG';
import { Article } from './Typography';

export default function PluginGuitarCard() {
  const [state, send] = useAudioEngine({ debug: { currentState: true } });

  const handlePluginGuitar = () => {
    if (!state.matches('idle')) {
      send('INITIALIZE');
    }
  };

  return (
    <Card className="h-[30rem]" disabled={state.matches('idle')}>
      <CardMedia svgComponent={<PluginGuitarSVG />} />
      <CardContent>
        <Article>
          <h1 className="text-secondary-500 mb-1">1. Plug In</h1>
          {state.matches('unitialized') && (
            <p className="text-primary-50">
              Connect your guitar so you&apos;ll instant feedback on your
              playing
            </p>
          )}

          {state.matches('initializing.gettingMicrophoneAccess') ||
            (state.matches('initializing.AIPitchDetection') && (
              <p className="text-primary-50">
                Please the allow to use your microphone
                <p className="m-0">
                  <em className="text-xs">
                    Your sound will not be recorded and is only used to analyze
                    your playing!
                  </em>
                </p>
              </p>
            ))}

          {state.matches('initializing.deniedMicrophoneAccess') && (
            <div className="flex flex-col gap-8">
              <p className="text-primary-50 m-0">
                <strong className="text-red-400">
                  {state.context.error?.message}!
                </strong>
                <br />
                This means that you cannot use most features of the Strumtasic!
                <br />
                <Link
                  href="https://support.google.com/chrome/answer/2693767"
                  target="_blank"
                  className="text-secondary-500 hover:text-secondary-400"
                >
                  Click here to learn how to reset your microphone permissions
                </Link>
              </p>
            </div>
          )}

          {state.matches('idle') && (
            <p className="text-primary-50">
              Thanks for plugging in!
							<br />
							<br />
							Now it&apos;s time to get your guitar in
              tune.
            </p>
          )}
        </Article>

        {!state.matches('initializing.deniedMicrophoneAccess') &&
          !state.matches('idle') && (
            <Button
              label="Plugin"
              onClick={handlePluginGuitar}
              disabled={state.matches('idle') && !state.matches('unitialized')}
            />
          )}
      </CardContent>
    </Card>
  );
}

const PluginGuitarSVG = () => {
  const [state] = useAudioEngine();

  return (
    <div className="h-full">
      {state.matches('unitialized') && (
        <GuitarAmpSVG className="stroke-primary-500 fill-primary-500 h-full" />
      )}

      {state.matches('initializing') &&
        !state.matches('initializing.deniedMicrophoneAccess') && (
          <LoadingCircleSVG
            animationDuration="1.5s"
            className="stroke-primary-500 fill-primary-500 h-full"
          />
        )}

      {state.matches('idle') && (
        <CheckMarkCircleSVG className="stroke-green-300 fill-green-300 h-full" />
      )}

      {state.matches('initializing.deniedMicrophoneAccess') && (
        <ErrorCicleSVG className="stroke-primary-500 fill-primary-500 h-full" />
      )}
    </div>
  );
};
