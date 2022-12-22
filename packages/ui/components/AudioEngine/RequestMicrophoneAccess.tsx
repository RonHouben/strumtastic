'use client';

import { useCallback, useEffect } from 'react';
import { useAudioEngine } from '../../hooks/useAudioEngine';
import { classNames } from '../../utils';
import { GuitarAmpSVG } from '../SVG';
import { Article } from '../Typography';
import Link from 'next/link';
import { ButtonLink } from '../ButtonLink';
import { Button } from '../Button';
import { useRouter } from 'next/navigation';

interface Props {
  navigatedFrom?: '/tuner' | string;
}

export const RequestMicrophoneAccess = ({ navigatedFrom }: Props) => {
  const [state, dispatch] = useAudioEngine();
  const router = useRouter();

  const handleContinue = useCallback(() => {
    dispatch({ type: 'STOP_LISTENING_TO_MICROPHONE' });

    if (navigatedFrom) {
      router.push(navigatedFrom);
    } else {
      router.back();
    }
  }, [dispatch, router, navigatedFrom])

  useEffect(() => {
    if (state.state === 'UNINITIALIZED') {
      dispatch({ type: 'GET_MICROPHONE_ACCESS' });
    }
  }, [state, dispatch]);

  return (
    <div className="flex-col">
      <GuitarAmpSVG
        className={classNames(
          state.microphonePermissionState === 'prompt' ? 'fill-orange-500' : '',
          state.microphonePermissionState === 'denied' ? 'fill-red-700' : '',
          state.microphonePermissionState === 'granted' ? 'fill-green-600' : '',
          'h-28 pb-5'
        )}
      />
      <Article>
        {state.state === 'UNINITIALIZED' && <h1>Lets Plug In Baby!</h1>}
        {state.state === 'DECLINED_MICROPHONE_ACCESS' && (
          <>
            <h1 className="text-red-700">
              {state.error?.message || 'Unknown Error!'}
            </h1>
            <div className="flex flex-col gap-8">
              <Link
                href="https://support.google.com/chrome/answer/2693767"
                target="_blank"
              >
                Click here to learn how to reset the Microphone permissions
              </Link>
              <ButtonLink label="Go Home" href='/' />
            </div>
          </>
        )}
        {state.state === 'INITIALIZED' && (
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