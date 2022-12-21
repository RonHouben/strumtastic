'use client';

import { createContext, ReactNode, useReducer } from 'react';
import { audioEngineReducer, AudioEngineReducerAction, audioEngineReducerInitialState, AudioEngineReducerState } from '../reducers/audio-engine.reducer';

interface Props {
  children: ReactNode;
}

export type IAudioEngineContext = [
  AudioEngineReducerState,
  React.Dispatch<AudioEngineReducerAction>,
]

export const AudioEngineContext = createContext<IAudioEngineContext>(null as unknown as IAudioEngineContext);

export function AudioEngineProvider({ children }: Props) {
  const reducer = useReducer(audioEngineReducer, audioEngineReducerInitialState);

  return (
    <AudioEngineContext.Provider value={reducer}>
      {children}
    </AudioEngineContext.Provider>
  );
}
