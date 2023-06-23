import { useContext } from 'react';
import {  StateMachinesContext } from '../providers/StateMachinesProvider';
import { useActor } from '@xstate/react';

export function useAudioEngine() {
  const { audioEngineService } = useContext(StateMachinesContext);

  const [state, send] = useActor(audioEngineService);

  return { state, send };
}
