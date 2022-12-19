import { ButtonGroup } from '../ButtonGroup';
import { AudioEngineCurrentAudioData } from './CurrentAudioData';
import { WaveFormAnayliser } from './WaveFormAnalyser';
import { AudioEngineStartButton } from './StartButton';
import { AudioEngineStopButton } from './StopButton';
import { Oscillator } from './Oscillator';

export const AudioEngineDebugger = () => {
  return (
    <>
      <WaveFormAnayliser />
      <ButtonGroup>
        <AudioEngineStartButton />
        <AudioEngineStopButton />
      </ButtonGroup>
      <Oscillator />
      <AudioEngineCurrentAudioData />
    </>
  );
};
