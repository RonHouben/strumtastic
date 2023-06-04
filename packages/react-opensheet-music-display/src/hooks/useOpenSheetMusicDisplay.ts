import { useContext } from 'react';
import { OpenSheetMusicDisplayContext } from '../providers/OpenSheetMusicDisplayProvider';
import { useActor } from '@xstate/react';

export default function useOpenSheetMusicDisplay() {
  const { osmdService } = useContext(OpenSheetMusicDisplayContext);

  const [state, send] = useActor(osmdService);

  const osmdMachine = { state, send };

  return {
    osmdMachine
  };
}
