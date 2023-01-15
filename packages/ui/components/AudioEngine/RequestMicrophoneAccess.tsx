'use client';

import { useCallback, useEffect } from 'react';
import { GuitarAmpSVG } from '../SVG';
import { ButtonLink } from '../ButtonLink';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { useClassNames } from '../../hooks/useClassNames';
import { Article } from '../Typography';
import Link from '../Link';
import { useGlobalState } from '../../hooks/useGlobalState';

interface Props {
  navigatedFrom?: '/tuner' | string;
}

export const RequestMicrophoneAccess = ({ navigatedFrom }: Props) => {
  const router = useRouter();
  const { classNames } = useClassNames();
  const { audioEngine } = useGlobalState();

  const handleContinue = useCallback(() => {
    if (navigatedFrom) {
      router.push(navigatedFrom);
    } else {
      router.back();
    }
  }, [router, navigatedFrom]);

  useEffect(() => {
    if (audioEngine.state.matches('unitialized')) {
      audioEngine.send('INITIALIZE');
    }
  }, [audioEngine]);

  return (
    <div className="flex-col">
      <GuitarAmpSVG
        className={classNames(
          audioEngine.state.matches('unitialized') ||
            audioEngine.state.matches('initializing.gettingMicrophoneAccess')
            ? 'fill-warning-500'
            : '',
          audioEngine.state.matches('initializing.deniedMicrophoneAccess')
            ? 'fill-error-600'
            : '',
          audioEngine.state.matches('idle') ? 'fill-green-600' : '',
          'h-28 pb-5'
        )}
      />
      <Article>
        {!audioEngine.state.matches('idle') &&
          !audioEngine.state.matches('initializing.deniedMicrophoneAccess') && (
            <h1 className="text-primary-500">Lets Plug In Baby!</h1>
          )}
        {audioEngine.state.matches('initializing.deniedMicrophoneAccess') && (
          <>
            <h1 className="text-error-600">
              {audioEngine.state.context.error?.message || 'Unknown Error!'}
            </h1>
            <div className="flex flex-col gap-8">
              <Link
                href="https://support.google.com/chrome/answer/2693767"
                target="_blank"
              >
                <p className="m-0">
                  Click here to learn how to reset the Microphone permissions
                </p>
              </Link>
              <ButtonLink size="md" variant="filled" color="secondary" href="/">
                Go Home
              </ButtonLink>
            </div>
          </>
        )}
        {audioEngine.state.matches('idle') && (
          <>
            <h1>Thanks for plugging in!</h1>
            <Button
              size="md"
              variant="filled"
              color="secondary"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </>
        )}
        <Disclaimer />
      </Article>
    </div>
  );
};

const Disclaimer = () => (
  <em>
    To analyse if you are hitting the right notes, We need to have access to
    your microphone.
    <br />
    Your sound will not be recorded!
  </em>
);
