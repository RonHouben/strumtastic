'use client';

import { useEffect } from 'react';
import { useAudioEngine } from '../../hooks/useAudioEngine';
import { classNames } from '../../utils';
import { GuitarAmpSVG } from '../SVG';
import { Article } from '../Typography';
import Link from 'next/link';
import { ButtonLink } from '../ButtonLink';

export const RequestMicrophoneAccess = () => {
  const [state, dispatch] = useAudioEngine();

  useEffect(() => {
    if (state.state === 'UNINITIALIZED') {
      dispatch({ type: 'REQUEST_MICROPHONE_ACCESS' });
    }
  }, [state, dispatch]);

  return (
    <div className="flex-col">
      <GuitarAmpSVG
        className={classNames(
          state.state === 'UNINITIALIZED' ? 'fill-orange-500' : '',
          state.state === 'DECLINED_MICROPHONE_ACCESS' ? 'fill-red-700' : '',
          state.state === 'RECEIVED_MICROPHONE_ACCESS' ? 'fill-green-600' : '',
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
              <ButtonLink label="Go Home" href='/'/>
            </div>
          </>
        )}
        {state.state === 'RECEIVED_MICROPHONE_ACCESS' && (
          <>
            <h1>Thanks for plugging in!</h1>
            <ButtonLink
              label="Continue"
              href="/tuner"
              className="!bg-green-500"
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