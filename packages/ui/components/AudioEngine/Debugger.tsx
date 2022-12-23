import { AudioEngineCurrentAudioData } from './CurrentAudioData';
import { WaveFormAnayliser } from './WaveFormAnalyser';
import { Oscillator } from './Oscillator';
import { Article } from '../Typography';

export const AudioEngineDebugger = () => {
  return (
    <Article>
      <div>This is for debugging:</div>
      <WaveFormAnayliser />
      <Oscillator />
      <AudioEngineCurrentAudioData />
    </Article>
  );
};
