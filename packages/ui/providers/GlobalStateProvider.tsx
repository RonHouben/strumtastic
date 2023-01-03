'use client';

import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import type { InterpreterFrom } from 'xstate';
import { audioEngineMachine } from 'audio-engine';
import { onboardUserMachine } from '../machines';
import { exerciseEngineMachine } from 'exercise-engine';

export type GlobalStateContext = {
  audioEngineService: InterpreterFrom<typeof audioEngineMachine>;
  onboardUserService: InterpreterFrom<typeof onboardUserMachine>;
  exerciseEngineService: InterpreterFrom<typeof exerciseEngineMachine>;
};

export const GlobalStateContext = createContext<GlobalStateContext>(
  {} as GlobalStateContext
);

interface Props {
  children: React.ReactNode;
}

export const GlobalStateProvider = ({ children }: Props) => {
  const audioEngineService = useInterpret(audioEngineMachine);
  const onboardUserService = useInterpret(onboardUserMachine);
  const exerciseEngineService = useInterpret(exerciseEngineMachine);

  return (
    <GlobalStateContext.Provider
      value={{ audioEngineService, onboardUserService, exerciseEngineService }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
