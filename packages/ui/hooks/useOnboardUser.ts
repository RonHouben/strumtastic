import { useContext } from 'react';
import { GlobalStateContext } from '../providers/GlobalStateProvider';
import { useActor } from '@xstate/react';

export function useOnboardUser() {
  const { onboardUserService } = useContext(GlobalStateContext);

  const [state, send] = useActor(onboardUserService);

  return { state, send };
}
