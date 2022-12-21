'use client';

import { Button } from "../../components/Button";
import { useAudioEngine } from '../../hooks/useAudioEngine';

export const AudioEngineStopButton = () => {
  const [state, dispatch] = useAudioEngine();

  const handleStop = () => {
    // audioEngine.stopInputAudioStream();
    new Error(`implement stopInputAudioStream in useAudioEngine dispatch`)
  };

	return <Button label="stop" onClick={handleStop} />
}