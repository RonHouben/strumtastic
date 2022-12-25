import { AudioEngineCurrentAudioData } from './CurrentAudioData';
import { WaveFormAnayliser } from './WaveFormAnalyser';
import { Oscillator } from './Oscillator';
import { Article } from '../Typography';
import { useAudioEngine } from 'audio-engine';
import { useCallback } from 'react';
import { Checkbox } from '../Checkbox';

export const AudioEngineDebugger = () => {
  const [state, send] = useAudioEngine({ debug: { currentState: true } });

  const handleSwitchUseAIPitchDetector = useCallback(() => {
    send({
      type: 'CONFIGURE_SETTINGS',
      data: {
        useAIPitchDetection: !state.context.audioEngine?.useAIPitchDetection
      }
    });
  }, [state, send]);

  return (
    <Article>
      <div>This is for debugging:</div>

      <Checkbox
        id="use-ai-pitch-detector"
        label="Use AI Pitch Detector?"
        checked={state.context.audioEngine?.useAIPitchDetection || false}
        disabled={state.matches('unitialized')}
        onChange={handleSwitchUseAIPitchDetector}
      />
      <WaveFormAnayliser />
      <Oscillator />
      <AudioEngineCurrentAudioData />
    </Article>
  );
};
