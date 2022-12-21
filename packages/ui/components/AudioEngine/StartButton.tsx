'use client';

import { Button } from '../../components/Button';
import { useAudioEngine } from '../../hooks/useAudioEngine';
import { useExercise } from '../../hooks/useExercise';
import { useMusicNotes } from '../../hooks/useMusicNotes';

export const AudioEngineStartButton = () => {
  const audioEngine = useAudioEngine();
  const [_state, dispatch] = useExercise();
  const { getMusicNoteByNoteName, getMusicNotesByNoteNames } = useMusicNotes();

  const handleStart = () => {
    // audioEngine.startInputAudioStream();
    throw new Error('implement distpatch startInputAudioStream')

    dispatch({
      type: 'initialise-exercise',
      payload: {
        key: 'C',
        name: 'C Major Scale',
        notesToPlay: getMusicNotesByNoteNames(
          ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
          3,
          2
        ),
        nextNoteToPlay: getMusicNoteByNoteName('C')
      }
    });
  };

  return <Button label="start" onClick={handleStart} />;
};
