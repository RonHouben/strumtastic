import { useEffect } from 'react';
import { useAudioEngine } from './useAudioEngine';

type DebugOptions = { stateValue?: boolean; context?: boolean };

interface Props {
  debug?: {
    audioEngine?: DebugOptions;
  };
}

interface Result {
  audioEngine: ReturnType<typeof useAudioEngine>;
}

export function useGlobalState({ debug }: Props = {}): Result {
  const audioEngine = useAudioEngine();

  // For debugging
  useEffect(() => {
    if (debug?.audioEngine) {
      console.log('*** audioEngine state machine ***');
      if (debug.audioEngine.context) {
        console.log(audioEngine.state.context);
      }

      if (debug.audioEngine.stateValue) {
        console.log(JSON.stringify(audioEngine.state.value));
      }
    }
  }, [audioEngine, debug]);

  return {
    audioEngine
  };
}
