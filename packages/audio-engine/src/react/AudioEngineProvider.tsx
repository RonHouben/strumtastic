import { useMachine } from '@xstate/react';
import React, { createContext } from 'react';
import { audioEngineMachine } from '../machines/audio-engine.machine';

export type IAudioEngineContext = ReturnType<
  typeof useMachine<typeof audioEngineMachine>
>;

export const AudioEngineContext = createContext<IAudioEngineContext>(
  null as unknown as IAudioEngineContext
);

interface Props {
  children: React.ReactNode;
}

export function AudioEngineProvider({ children }: Props) {
  const machine = useMachine(audioEngineMachine);

  return (
    <AudioEngineContext.Provider value={machine}>
      {children}
    </AudioEngineContext.Provider>
  );
}
