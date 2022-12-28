import { useContext } from 'react';
import { GlobalStateContext } from '../providers/GlobalStateProvider';
import { useActor } from '@xstate/react';

export function useAudioEngine() {
  const { audioEngineService } = useContext(GlobalStateContext);

  const [state, send] = useActor(audioEngineService);

  return { state, send };
}
