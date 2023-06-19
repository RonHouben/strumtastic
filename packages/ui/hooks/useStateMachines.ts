'use client';

import { useEffect } from 'react';
import { useAudioEngine } from './useAudioEngine';
import { useExerciseEngineMachine } from './useExerciseEngineMachine';
import { useOnboardUser } from './useOnboardUser';
import { useOpenSheetMusicDisplayMachine } from './useOpenSheetMusicDisplayMachine';

type DebugOptions = { state?: boolean; context?: boolean };

type Debug = {
  audioEngine?: DebugOptions;
  onboardUser?: DebugOptions;
  exerciseEngine?: DebugOptions;
  osmdMachine?: DebugOptions;
};

interface Props {
  debug?: Debug;
}

interface MachineActors {
  audioEngine: ReturnType<typeof useAudioEngine>;
  onboardUser: ReturnType<typeof useOnboardUser>;
  exerciseEngine: ReturnType<typeof useExerciseEngineMachine>;
  osmdMachine: ReturnType<typeof useOpenSheetMusicDisplayMachine>;
}

export function useStateMachines({ debug }: Props = {}): MachineActors {
  const audioEngine = useAudioEngine();
  const onboardUser = useOnboardUser();
  const exerciseEngine = useExerciseEngineMachine();
  const osmdMachine = useOpenSheetMusicDisplayMachine();

  // For debugging
  useEffect(() => {
    if (debug) {
      debugStateMachines(debug, {
        audioEngine,
        onboardUser,
        exerciseEngine,
        osmdMachine
      });
    }
  }, [debug, audioEngine, onboardUser, exerciseEngine, osmdMachine]);

  return {
    audioEngine,
    onboardUser,
    exerciseEngine,
    osmdMachine
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
