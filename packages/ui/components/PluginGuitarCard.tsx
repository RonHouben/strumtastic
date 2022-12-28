'use client';

import { useGlobalState } from '../hooks/useGlobalState';
import Button from './Button';
import { Card, CardMedia, CardContent } from './Card';
import Link from './Link';
import { CheckMarkCircleSVG, GuitarAmpSVG, LoadingCircleSVG } from './SVG';
import ErrorCicleSVG from './SVG/ErrorCircleSVG';
import { Article } from './Typography';

export default function PluginGuitarCard() {
  const { audioEngine } = useGlobalState({
    debug: { audioEngine: { stateValue: true, context: true } }
  });

  const handlePluginGuitar = () => {
    if (!audioEngine.state.matches('idle')) {
      audioEngine.send('INITIALIZE');
    }
  };

  return (
    <Card className="h-[30rem]" disabled={audioEngine.state.matches('idle')}>
      <CardMedia svgComponent={<PluginGuitarSVG />} />
      <CardContent>
        <Article>
          <h1 className="text-secondary-100 mb-1">1. Plug In</h1>
          {audioEngine.state.matches('unitialized') && (
            <p className="text-primary-100">
              Connect your guitar so you&apos;ll instant feedback on your
              playing
            </p>
          )}

          {audioEngine.state.matches('initializing') && (
            <p className="text-primary-100">
              Please the allow to use your microphone
              <em className="text-xs">
                Your sound will not be recorded and is only used to analyze your
                playing!
              </em>
            </p>
          )}

          {audioEngine.state.matches('initializing.deniedMicrophoneAccess') && (
            <div className="flex flex-col gap-8">
              <p className="text-primary-100 m-0">
                <strong className="text-accent-500">
                  {audioEngine.state.context.error?.message}!
                </strong>
                <br />
                This means that you cannot use most features of the Strumtasic!
                <br />
                <Link
                  href="https://support.google.com/chrome/answer/2693767"
                  target="_blank"
                  className="text-accent-500 hover:text-accent-200"
                >
                  Click here to learn how to reset your microphone permissions
                </Link>
              </p>
            </div>
          )}

          {audioEngine.state.matches('idle') && (
            <p className="text-primary-100">
              Thanks for plugging in!
              <br />
              <br />
              Now it&apos;s time to get your guitar in tune.
            </p>
          )}
        </Article>

        {!audioEngine.state.matches('initializing') &&
          !audioEngine.state.matches('idle') && (
            <Button
              label="Plugin"
              onClick={handlePluginGuitar}
              disabled={
                audioEngine.state.matches('initializing') ||
                audioEngine.state.matches('idle')
              }
            />
          )}
      </CardContent>
    </Card>
  );
}

const PluginGuitarSVG = () => {
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

      {audioEngine.state.matches('idle') && (
        <CheckMarkCircleSVG className="h-full fill-green-300 stroke-green-300" />
      )}

      {audioEngine.state.matches('initializing.deniedMicrophoneAccess') && (
        <ErrorCicleSVG className="stroke-primary-500 fill-primary-500 h-full" />
      )}
    </div>
  );
};
