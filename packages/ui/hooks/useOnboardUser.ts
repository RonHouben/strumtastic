import { useContext } from 'react';
import { StateMachinesContext } from '../providers/StateMachinesProvider';
import { useActor } from '@xstate/react';

export function useOnboardUser() {
  const { onboardUserService } = useContext(StateMachinesContext);

  const [state, send] = useActor(onboardUserService);

  return { state, send };
}
