import { useContext } from 'react';
import { StateMachinesContext } from '../providers/StateMachinesProvider';
import { useActor } from '@xstate/react';

export function useOpenSheetMusicDisplayMachine() {
  const { openSheetMusicDisplayService } = useContext(StateMachinesContext);

  const [state, send] = useActor(openSheetMusicDisplayService);

  return { state, send };
}
