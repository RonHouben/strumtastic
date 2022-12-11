import { Button } from '../../components/Button';
import { useAudioEngine } from '../../hooks/useAudioEngine';

export const AudioEngineStartButton = () => {
  const audioEngine = useAudioEngine();

  const handleStart = () => {
    audioEngine.startInputAudioStream();
  };

	return <Button label="start" onClick={handleStart} />
}