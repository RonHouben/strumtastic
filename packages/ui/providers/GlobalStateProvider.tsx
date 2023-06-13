'use client';

import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import type { InterpreterFrom } from 'xstate';
import { audioEngineMachine } from 'audio-engine';
import { onboardUserMachine } from '../machines';
import { exerciseEngineMachine } from 'exercise-engine';

export interface IGlobalStateContext {
  audioEngineService: InterpreterFrom<typeof audioEngineMachine>;
  onboardUserService: InterpreterFrom<typeof onboardUserMachine>;
  exerciseEngineService: InterpreterFrom<typeof exerciseEngineMachine>;
};

export const GlobalStateContext = createContext<IGlobalStateContext>(
  {} as IGlobalStateContext
);

interface Props {
  children: React.ReactNode;
}

export const GlobalStateProvider = ({ children }: Props) => {
  const audioEngineService = useInterpret(audioEngineMachine, { context: {
    mlModelUrl: '/api/v1/ml-model/crepe/model.json',
  }});
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
