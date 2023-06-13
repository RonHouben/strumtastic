'use client';

import { useEffect } from 'react';
import { useAudioEngine } from './useAudioEngine';
import { useExerciseEngineMachine } from './useExerciseEngineMachine';
import { useOnboardUser } from './useOnboardUser';

type DebugOptions = { state?: boolean; context?: boolean };

type Debug = {
  audioEngine?: DebugOptions;
  onboardUser?: DebugOptions;
  exerciseEngine?: DebugOptions;
};

interface Props {
  debug?: Debug;
}

interface MachineActors {
  audioEngine: ReturnType<typeof useAudioEngine>;
  onboardUser: ReturnType<typeof useOnboardUser>;
  exerciseEngine: ReturnType<typeof useExerciseEngineMachine>;
}

export function useGlobalState({ debug }: Props = {}): MachineActors {
  const audioEngine = useAudioEngine();
  const onboardUser = useOnboardUser();
  const exerciseEngine = useExerciseEngineMachine();

  // For debugging
  useEffect(() => {
    if (debug) {
      debugStateMachines(debug, { audioEngine, onboardUser, exerciseEngine });
    }
  }, [debug, audioEngine, onboardUser, exerciseEngine]);

  return {
    audioEngine,
    onboardUser,
    exerciseEngine
  };
}

type DebugMachines = {
  [key in keyof Debug]: MachineActors[key];
};

function debugStateMachines(debug: Debug, machines: DebugMachines): void {
  for (const [machineName, debugOptions] of Object.entries(debug)) {
    const machine = machines[machineName as keyof DebugMachines];

    if (machine) {
      console.log(`*** ${machineName} state machine ***`);

      if (debugOptions.context) {
        console.log(machine.state.context);
      }

      if (debugOptions.state) {
        console.log(JSON.stringify(machine.state.value));
      }
    }
  }
}
