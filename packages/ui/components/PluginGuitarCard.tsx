'use client';

import { useEffect } from 'react';
import { useGlobalState } from '../hooks/useGlobalState';
import Button from './Button';
import { Card, CardMedia, CardContent } from './Card';
import Link from './Link';
import PluginGuitarSVG from './SVG/PluginGuitarSVG';
import { Article } from './Typography';

interface Props {
  disabled?: boolean;
  onDone: () => void;
}

export default function PluginGuitarCard({ disabled, onDone }: Props) {
  const { audioEngine, onboardUser } = useGlobalState();

  const handlePluginGuitar = () => {
    audioEngine.send('INITIALIZE');
  };

  // Call onDone if plugging in is done
  useEffect(() => {
    if (!disabled && audioEngine.state.matches('idle')) {
      onDone();
    }
  }, [disabled, audioEngine, onDone]);

  return (
    <Card className="h-[30rem]" disabled={disabled}>
      <CardMedia>
        <PluginGuitarSVG
          isDone={onboardUser.state.context.isPluggedIn}
          isLoading={
            audioEngine.state.matches('initializing') &&
            !audioEngine.state.matches('initializing.deniedMicrophoneAccess')
          }
          isError={audioEngine.state.matches(
            'initializing.deniedMicrophoneAccess'
          )}
        />
      </CardMedia>
      <CardContent>
        <Article>
          <h1 className="text-secondary-100 mb-1">1. Plug In</h1>
          {audioEngine.state.matches('unitialized') && (
            <p className="text-primary-100">
              Connect your guitar to get feedback on your playing
            </p>
          )}

          {audioEngine.state.matches('initializing') &&
            !audioEngine.state.matches(
              'initializing.deniedMicrophoneAccess'
            ) && (
              <p className="text-primary-100">
                Please the allow to use your microphone
                <br />
                <em className="text-xs">
                  Your sound will not be recorded and is only used to analyze
                  your playing!
                </em>
              </p>
            )}

          {audioEngine.state.matches('initializing.deniedMicrophoneAccess') && (
            <div className="flex flex-col gap-8">
              <p className="text-primary-100 m-0">
                <strong className="text-error-500">Permissions denied!</strong>
                <br />
                This means that you cannot use most features of Strumtasic!
                <br />
                <Link
                  href="https://support.google.com/chrome/answer/2693767"
                  target="_blank"
                  className="text-error-500 hover:text-accent-200"
                >
                  Click here to learn how to reset your microphone permissions
                </Link>
              </p>
            </div>
          )}

          {!onboardUser.state.matches('pluggingInGuitar') && (
            <p className="text-primary-100">
              Thanks for plugging in!
              <br />
              <br />
              Now it&apos;s time to get your guitar in tune.
            </p>
          )}
        </Article>

        {!disabled && !audioEngine.state.matches('initializing') && (
          <Button label="Plugin" onClick={handlePluginGuitar} />
        )}
      </CardContent>
    </Card>
  );
}
