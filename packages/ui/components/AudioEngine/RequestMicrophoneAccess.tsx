'use client';

import { useEffect } from 'react';
import { useAudioEngine } from '../../hooks/useAudioEngine';
import { AudioEngineReducerAction } from '../../reducers/audio-engine.reducer';
import { classNames } from '../../utils';
import { Button } from '../Button';
import { GuitarAmpSVG } from '../SVG';
import { Article } from '../Typography';

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

  const handleRetry = async () => {
		await requestMicrophoneAccessAsync(dispatch);
  };

  return (
    <div className="flex-col">
      <GuitarAmpSVG
        className={classNames(
          state.state === 'uninitialized' ? 'fill-orange-500' : '',
          state.state === 'declined-microphone-access' ? 'fill-red-700' : '',
          state.state === 'recieved-microphone-access' ? 'fill-green-500' : '',
          'h-28 pb-5'
        )}
      />
      <Article>
        <h1>Time to connect your Axe!</h1>
        {state.state === 'declined-microphone-access' && (
          <>
            <p className="font-bold text-red-700">
              {state.error?.message || 'Unknown Error!'}
            </p>
            <Button label="Retry!" onClick={handleRetry} />
          </>
        )}
        {state.state === 'recieved-microphone-access' && (
          <p>Yay got Microphone Access!</p>
        )}
        <Disclaimer />
      </Article>
    </div>
  );
};

const Disclaimer = () => (
  <p>
    To analyse if you are hitting the right notes, I need to have access to your
    microphone.
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
