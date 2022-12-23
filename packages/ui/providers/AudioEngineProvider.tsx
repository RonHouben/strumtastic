'use client';

import { createContext, ReactNode, useEffect, useMemo } from 'react';
import {
  audioEngineAsyncActionHandlers,
  audioEngineReducer,
  AudioEngineReducerAction,
  audioEngineReducerInitialState,
  AudioEngineReducerState
} from '../reducers/audio-engine.reducer';
import { useReducerAsync } from 'use-reducer-async';

interface Props {
  children: ReactNode;
}

export type IAudioEngineContext = [
  AudioEngineReducerState,
  React.Dispatch<AudioEngineReducerAction>
];

export const AudioEngineContext = createContext<IAudioEngineContext>(
  null as unknown as IAudioEngineContext
);

export function AudioEngineProvider({ children }: Props) {
  const reducer = useReducerAsync(
    audioEngineReducer,
    audioEngineReducerInitialState,
    audioEngineAsyncActionHandlers
  );

  const memoisedReducer = useMemo(() => reducer, [reducer]);

  useEffect(() => {
    const [state, dispatch] = memoisedReducer;
    let requestAnimationFrameId: number;

    if (state.state === 'UNINITIALIZED') {
      const getMicrophonePermissionsAsync = async () => {
        const microphonePermissionStatus = await navigator.permissions.query({
          name: 'microphone' as PermissionName
        });

        if (
          microphonePermissionStatus.state === 'granted' &&
          state.state === 'UNINITIALIZED'
        ) {
          dispatch({
            type: 'INITIALIZE_AUDIO_ENGINE',
            payload: {
              userMediaStream: await navigator.mediaDevices.getUserMedia({
                audio: {
                  noiseSuppression: true,
                  echoCancellation: true,
                  autoGainControl: true,
                },
              })
            }
          });
        }
      };

      getMicrophonePermissionsAsync();
    }

    // update currentFrequency
    if (state.state === 'LISTENING_TO_MICROPHONE') {
      requestAnimationFrameId = requestAnimationFrame(() => {
        dispatch({
          type: 'SET_CURRENT_FREQUENCY_AND_NOTE',
          payload: {
            requestAnimationFrameId:
              state.requestAnimationFrameId || requestAnimationFrameId
          }
        });
      });
    }
  }, [memoisedReducer]);

  return (
    <AudioEngineContext.Provider value={memoisedReducer}>
      {children}
    </AudioEngineContext.Provider>
  );
}
