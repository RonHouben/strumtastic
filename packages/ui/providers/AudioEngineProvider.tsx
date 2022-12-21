'use client';

import { createContext, ReactNode } from 'react';
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

  return (
    <AudioEngineContext.Provider value={reducer}>
      {children}
    </AudioEngineContext.Provider>
  );
}
