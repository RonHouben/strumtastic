import { AudioEngineCurrentAudioData } from './CurrentAudioData';
import { WaveFormAnayliser } from './WaveFormAnalyser';
import { Oscillator } from './Oscillator';
import { Article } from '../Typography';
import { useAudioEngine } from '../../hooks/useAudioEngine';
import { useCallback } from 'react';
import { Checkbox } from '../Checkbox';

export const AudioEngineDebugger = () => {
  const [state, dispatch] = useAudioEngine();

  const handleSwitchUseAIPitchDetector = useCallback(() => {
    dispatch({
      type: 'SET_USE_AI_PITCH_DETECTION',
      payload: { useAI: !state.useAIPitchDetector }
    });
  }, [state, dispatch]);

  return (
    <Article>
      <div>This is for debugging:</div>

      <Checkbox
        id="use-ai-pitch-detector"
        label='Use AI Pitch Detector?'
        checked={state.useAIPitchDetector}
        onChange={handleSwitchUseAIPitchDetector}
      />
      <WaveFormAnayliser />
      <Oscillator />
      <AudioEngineCurrentAudioData />
    </Article>
  );
};
