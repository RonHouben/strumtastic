'use client';

import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import type { InterpreterFrom } from 'xstate';
import { audioEngineMachine } from 'audio-engine';
import { onboardUserMachine } from '../machines';
import { exerciseEngineMachine } from 'exercise-engine';
import { openSheetMusicDisplayMachine } from 'opensheet-music-display';

export interface IStateMachinesContext {
  audioEngineService: InterpreterFrom<typeof audioEngineMachine>;
  onboardUserService: InterpreterFrom<typeof onboardUserMachine>;
  exerciseEngineService: InterpreterFrom<typeof exerciseEngineMachine>;
  openSheetMusicDisplayService: InterpreterFrom<
    typeof openSheetMusicDisplayMachine
  >;
}

export const StateMachinesContext = createContext<IStateMachinesContext>(
  {} as IStateMachinesContext
);

interface Props {
  children: React.ReactNode;
}

export const StateMachinesProvider = ({ children }: Props) => {
  const audioEngineService = useInterpret(audioEngineMachine, {
    context: {
      mlModelUrl: '/api/v1/ml-model/crepe/model.json'
    }
  });
  const onboardUserService = useInterpret(onboardUserMachine);
  const exerciseEngineService = useInterpret(exerciseEngineMachine);
  const openSheetMusicDisplayService = useInterpret(
    openSheetMusicDisplayMachine
  );

  return (
    <StateMachinesContext.Provider
      value={{
        audioEngineService,
        onboardUserService,
        exerciseEngineService,
        openSheetMusicDisplayService
      }}
    >
      {children}
    </StateMachinesContext.Provider>
  );
};
