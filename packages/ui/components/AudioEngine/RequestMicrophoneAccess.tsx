'use client';

import { useCallback, useEffect } from 'react';
import { GuitarAmpSVG } from '../SVG';
import Article from '../Typography/Article';
import Link from 'next/link';
import { ButtonLink } from '../ButtonLink';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { useAudioEngine } from '@audio-engine/react';
import { useClassNames } from '../../hooks/useClassNames';

interface Props {
  navigatedFrom?: '/tuner' | string;
}

export const RequestMicrophoneAccess = ({ navigatedFrom }: Props) => {
  const router = useRouter();
  const { classNames } = useClassNames();

  const [state, send] = useAudioEngine();

  const handleContinue = useCallback(() => {
    if (navigatedFrom) {
      router.push(navigatedFrom);
    } else {
      router.back();
    }
  }, [router, navigatedFrom]);

  useEffect(() => {
    send('INITIALIZE');
  }, [send]);

  return (
    <div className="flex-col">
      <GuitarAmpSVG
        className={classNames(
          state.matches('unitialized') ||
            state.matches('initializing.gettingMicrophoneAccess')
            ? 'fill-orange-500'
            : '',
          state.matches('initializing.deniedMicrophoneAccess')
            ? 'fill-red-700'
            : '',
          state.matches('idle') ? 'fill-green-600' : '',
          'h-28 pb-5'
        )}
      />
      <Article>
        {!state.matches('idle') &&
          !state.matches('initializing.deniedMicrophoneAccess') && (
            <h1>Lets Plug In Baby!</h1>
          )}
        {state.matches('initializing.deniedMicrophoneAccess') && (
          <>
            <h1 className="text-red-700">
              {state.context.error?.message || 'Unknown Error!'}
            </h1>
            <div className="flex flex-col gap-8">
              <Link
                href="https://support.google.com/chrome/answer/2693767"
                target="_blank"
              >
                Click here to learn how to reset the Microphone permissions
              </Link>
              <ButtonLink label="Go Home" href="/" />
            </div>
          </>
        )}
        {state.matches('idle') && (
          <>
            <h1>Thanks for plugging in!</h1>
            <Button
              label="Continue"
              className="!bg-green-500"
              onClick={handleContinue}
            />
          </>
        )}
        <Disclaimer />
      </Article>
    </div>
  );
};

const Disclaimer = () => (
  <p>
    To analyse if you are hitting the right notes, We need to have access to
    your microphone.
    <br />
    Your sound will not be recorded!
  </p>
);
