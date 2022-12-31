import { AudioEngineCurrentAudioData } from './CurrentAudioData';
import { WaveFormAnayliser } from './WaveFormAnalyser';
import Article from '../Typography/Article';
import { useCallback } from 'react';
import { Checkbox } from '../Checkbox';
import { useGlobalState } from '../../hooks/useGlobalState';

export const AudioEngineDebugger = () => {
  const { audioEngine } = useGlobalState();

  const handleSwitchUseAIPitchDetector = useCallback(() => {
    audioEngine.send({
      type: 'CONFIGURE_SETTINGS',
      data: {
        useAIPitchDetection: !audioEngine.state.context.audioEngine?.useAIPitchDetection
      }
    });
  }, [audioEngine]);

  return (
    <Article>
      <div>This is for debugging:</div>

      <Checkbox
        id="use-ai-pitch-detector"
        label="Use AI Pitch Detector?"
        checked={audioEngine.state.context.audioEngine?.useAIPitchDetection || false}
        disabled={audioEngine.state.matches('unitialized')}
        onChange={handleSwitchUseAIPitchDetector}
      />
      <WaveFormAnayliser />
      <AudioEngineCurrentAudioData />
    </Article>
  );
};
