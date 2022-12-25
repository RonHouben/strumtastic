import { useCallback } from 'react';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { Hertz } from '../AudioEngine';
import { Button } from '../Button';
import { Article } from '../Typography';
import { useAudioEngine } from '@audio-engine/react';
import { AudioEngineNotInitialized } from '../AudioEngine/NotInitialized';

interface Props {
  onStopTuner: () => void;
}

export const GuitarTuner = ({ onStopTuner }: Props) => {
  const { getNoteName } = useMusicNotes();
  const [state, send] = useAudioEngine({ debug: { currentState: true } });

  const handleStartTuner = useCallback(() => {
    send('START_LISTENING_TO_MICROPHONE');
  }, [send]);

  const handleStopTuner = useCallback(() => {
    send('STOP_LISTENING_TO_MICROPHONE');
    onStopTuner();
  }, [send, onStopTuner]);

  return (
    <div className="m-2 flex w-60 flex-col items-center justify-center rounded-md bg-slate-400 p-2 shadow-lg">
      <Article className="w-full text-center">
        {state.matches('unitialized') && <AudioEngineNotInitialized />}
        {!state.matches('unitialized') && (
          <>
            <Hertz hertz={state.context.audioEngine?.currentFrequency || 0} />
            <h1>
              {state.context.audioEngine?.currentMusicNote
                ? getNoteName(
                    'sharps',
                    state.context.audioEngine.currentMusicNote
                  )
                : '-'}
            </h1>
            {state.matches('idle') && (
              <Button
                label="Start Tuning"
                className="bg-slate-600 text-slate-300"
                onClick={handleStartTuner}
              />
            )}
            {state.matches('listeningToMicrophone') && (
              <Button
                label="Done"
                className="bg-slate-600 text-slate-300"
                onClick={handleStopTuner}
              />
            )}
          </>
        )}
      </Article>
    </div>
  );
};
