import { useContext, useEffect } from 'react';
import {
  ExerciseContext,
  IExerciseContext
} from '../providers/ExerciseProvider';
import { useAudioEngine } from './useAudioEngine';

export function useExercise(): IExerciseContext {
  const [state, dispatch] = useContext(ExerciseContext);

  const [audioEngineState, _audioEngineDispatch] = useAudioEngine();
  const { currentMusicNote } = audioEngineState;

  useEffect(() => {
    if (
      state.isInitialised &&
      !state.isDone &&
      currentMusicNote &&
      state.lastPlayedNote !== currentMusicNote
    ) {
      dispatch({
        type: 'record-played-note',
        payload: { playedNote: currentMusicNote }
      });
    }
  }, [currentMusicNote, state, dispatch]);

  return [state, dispatch];
}
