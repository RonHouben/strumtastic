'use client';

import { Button } from "../../components/Button";
import { useAudioEngine } from '../../hooks/useAudioEngine.old';

export const AudioEngineStopButton = () => {
  const audioEngine = useAudioEngine();

  const handleStop = () => {
    audioEngine.stopInputAudioStream();
  };

	return <Button label="stop" onClick={handleStop} />
}