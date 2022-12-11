import { ButtonGroup } from '../ButtonGroup';
import { AudioEngineCurrentAudioData } from './CurrentAudioData';
import { Oscilator } from './Oscilator';
import { AudioEngineStartButton } from './StartButton';
import { AudioEngineStopButton } from './StopButton';

export const AudioEngineDebugger = () => {
  return (
    <>
      <Oscilator />
      <ButtonGroup>
        <AudioEngineStartButton />
        <AudioEngineStopButton />
      </ButtonGroup>
      <AudioEngineCurrentAudioData />
    </>
  );
};
