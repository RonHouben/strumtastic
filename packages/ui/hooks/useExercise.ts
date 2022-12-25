import { useContext, useEffect } from 'react';
import {
  ExerciseContext,
  IExerciseContext
} from '../providers/ExerciseProvider';
import { useAudioEngine } from '@audio-engine/react';

export function useExercise(): IExerciseContext {
  const [state, dispatch] = useContext(ExerciseContext);

  const [audioEngineState, _audioEngineDispatch] = useAudioEngine();

  useEffect(() => {
    if (
      state.isInitialised &&
      !state.isDone &&
      audioEngineState.context.audioEngine?.currentMusicNote &&
      audioEngineState.context.audioEngine?.currentMusicNote !==
        state.lastPlayedNote
    ) {
      dispatch({
        type: 'record-played-note',
        payload: {
          playedNote: audioEngineState.context.audioEngine.currentMusicNote
        }
      });
    }
  }, [audioEngineState, state, dispatch]);

  return [state, dispatch];
}
