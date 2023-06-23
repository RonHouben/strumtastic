'use client';

import { useCallback, useEffect } from 'react';
import { useStateMachines } from 'ui/hooks/useStateMachines';
import { Button } from 'ui/components/button';
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter
} from 'ui/components/card';
import Link from 'next/link';
import { PluginGuitarIcons } from 'ui/components/icons-plugin-guitar';

interface Props {
  disabled?: boolean;
  onDone: () => void;
}

export function PluginGuitarCard({ disabled, onDone }: Props) {
  const { audioEngine, onboardUser } = useStateMachines();

  const handlePluginGuitar = useCallback(() => {
    audioEngine.send('INITIALIZE');
  }, [audioEngine]);

  // Call onDone if plugging in is done
  useEffect(() => {
    if (!disabled && audioEngine.state.matches('idle')) {
      onDone();
    }
  }, [disabled, audioEngine, onDone]);

  return (
    <Card className="flex snap-center flex-col justify-center text-center">
      <CardHeader>
        <CardTitle>Plugin your guitar</CardTitle>
        <CardDescription>
          Connect your guitar to get instant feedback on your playing
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <PluginGuitarIcons
          isDone={onboardUser.state.context.isPluggedIn}
          isLoading={
            audioEngine.state.matches('initializing') &&
            !audioEngine.state.matches('initializing.deniedMicrophoneAccess')
          }
          isError={audioEngine.state.matches(
            'initializing.deniedMicrophoneAccess'
          )}
        />

        {audioEngine.state.matches('unitialized') && (
          <p className="text-primary-100"></p>
        )}

        {audioEngine.state.matches('initializing') &&
          !audioEngine.state.matches('initializing.deniedMicrophoneAccess') && (
            <p className="text-primary-100">
              Please the allow to use your microphone
              <br />
              <em className="text-xs">
                Your sound will not be recorded and is only used to analyze your
                playing!
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
          <p className="text-primary-100">Thanks for plugging in!</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {!disabled && !audioEngine.state.matches('initializing') && (
          <Button
            color="secondary"
            className="!bg-secondary-500 hover:!bg-secondary-700"
            onClick={handlePluginGuitar}
          >
            Plugin
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
