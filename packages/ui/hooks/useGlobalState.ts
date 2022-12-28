import { useEffect } from 'react';
import { useAudioEngine } from './useAudioEngine';
import { useOnboardUser } from './useOnboardUser';

type DebugOptions = { state?: boolean; context?: boolean };

type Debug = {
  audioEngine?: DebugOptions;
  onboardUser?: DebugOptions;
};

interface Props {
  debug?: Debug;
}

interface MachineActors {
  audioEngine: ReturnType<typeof useAudioEngine>;
  onboardUser: ReturnType<typeof useOnboardUser>;
}

export function useGlobalState({ debug }: Props = {}): MachineActors {
  const audioEngine = useAudioEngine();
  const onboardUser = useOnboardUser();

  // For debugging
  useEffect(() => {
    if (debug) {
      debugStateMachines(debug, { audioEngine, onboardUser });
    }
  }, [debug, audioEngine, onboardUser]);

  return {
    audioEngine,
    onboardUser
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
