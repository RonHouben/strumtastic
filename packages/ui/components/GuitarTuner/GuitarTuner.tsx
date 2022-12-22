import { useCallback } from 'react';
import { useAudioEngine } from '../../hooks/useAudioEngine';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { Hertz } from '../AudioEngine';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Article } from '../Typography';

interface Props {
  onStopTuner: () => void;
}

export const GuitarTuner = ({ onStopTuner }: Props) => {
  const { getNoteName } = useMusicNotes();
  const [state, dispatch] = useAudioEngine();

  const handleStartTuner = useCallback(() => {
    dispatch({ type: 'START_LISTENING_TO_MICROPHONE' });
  }, [dispatch]);

  const handleStopTuner = useCallback(() => {
    dispatch({ type: 'STOP_LISTENING_TO_MICROPHONE' });
    onStopTuner();
  }, [dispatch, onStopTuner]);

  return (
    <div className="m-2 flex w-60 flex-col items-center justify-center rounded-md bg-slate-400 p-2 shadow-lg">
      <Article className="w-full text-center">
        <Hertz hertz={state.currentFrequency} />
        <h1>
          {state.currentMusicNote
            ? getNoteName('sharps', state.currentMusicNote)
            : '-'}
        </h1>
        {state.state === 'INITIALIZED' && (
          <Button
            label="Start Tuning"
            className="bg-slate-600 text-slate-300"
            onClick={handleStartTuner}
          />
        )}
        {state.state === 'LISTENING_TO_MICROPHONE' && (
          <Button
            label="Done"
            className="bg-slate-600 text-slate-300"
            onClick={handleStopTuner}
          />
        )}
      </Article>
    </div>
  );
};
