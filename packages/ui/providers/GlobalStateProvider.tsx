import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import type { InterpreterFrom } from 'xstate';
import { audioEngineMachine } from 'audio-engine';

export type GlobalStateContext = {
  audioEngineService: InterpreterFrom<typeof audioEngineMachine>;
};

export const GlobalStateContext = createContext<GlobalStateContext>(
  {} as GlobalStateContext
);

interface Props {
  children: React.ReactNode;
}

export const GlobalStateProvider = ({ children }: Props) => {
  const audioEngineService = useInterpret(audioEngineMachine);

  return (
    <GlobalStateContext.Provider value={{ audioEngineService }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
