'use client';

import { useEffect } from 'react';
import { useAudioEngine } from '../../hooks/useAudioEngine';
import { AudioEngineReducerAction } from '../../reducers/audio-engine.reducer';
import { classNames } from '../../utils';
import { GuitarAmpSVG } from '../SVG';
import { Article } from '../Typography';
import Link from 'next/link';
import { ButtonLink } from '../ButtonLink';

export const RequestMicrophoneAccess = () => {
  const [state, dispatch] = useAudioEngine();

  useEffect(() => {
    if (
      state.state !== 'declined-microphone-access' &&
      state.state === 'uninitialized'
    ) {
      requestMicrophoneAccessAsync(dispatch);
    }
  }, [state.state, dispatch]);

  return (
    <div className="flex-col">
      <GuitarAmpSVG
        className={classNames(
          state.state === 'uninitialized' ? 'fill-orange-500' : '',
          state.state === 'declined-microphone-access' ? 'fill-red-700' : '',
          state.state === 'recieved-microphone-access' ? 'fill-green-600' : '',
          'h-28 pb-5'
        )}
      />
      <Article>
        {state.state === 'uninitialized' && <h1>Lets Plug In Baby!</h1>}
        {state.state === 'declined-microphone-access' && (
          <>
            <h1 className="text-red-700">
              {state.error?.message || 'Unknown Error!'}
            </h1>
            <Link
              href="https://support.google.com/chrome/answer/2693767"
              target="_blank"
            >
              Click here to learn how to reset the Microphone permissions
            </Link>
          </>
        )}
        {state.state === 'recieved-microphone-access' && (
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

const requestMicrophoneAccessAsync = async (
  dispatch: React.Dispatch<AudioEngineReducerAction>
) => {
  try {
    dispatch({
      type: 'initialize',
      payload: {
        userMediaStream: await navigator.mediaDevices.getUserMedia({
          audio: true
        })
      }
    });
  } catch (err) {
    const error = err as DOMException;

    dispatch({ type: 'declined-microphone-access', payload: { error } });
  }
};
