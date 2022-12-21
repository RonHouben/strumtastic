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
    <div className="m-2 flex flex-col items-center justify-center rounded-md border p-2">
      <Article className="text-center">
        <Hertz hertz={state.currentFrequency} />
        <h1>
          {state.currentMusicNote
            ? getNoteName('sharps', state.currentMusicNote)
            : '-'}
        </h1>
        <ButtonGroup>
          <Button label="Start Tuning" onClick={handleStartTuner} />
          <Button label="Done tuning!" onClick={handleStopTuner} />
        </ButtonGroup>
      </Article>
    </div>
  );
};
