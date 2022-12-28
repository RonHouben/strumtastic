'use client';

import { useContext, useEffect } from 'react';
import {
  ExerciseContext,
  IExerciseContext
} from '../providers/ExerciseProvider';
import { useGlobalState } from './useGlobalState';

export function useExercise(): IExerciseContext {
  const [state, dispatch] = useContext(ExerciseContext);
  const { audioEngine } = useGlobalState();

  useEffect(() => {
    if (
      state.isInitialised &&
      !state.isDone &&
      audioEngine.state.context.audioEngine?.currentMusicNote &&
      audioEngine.state.context.audioEngine?.currentMusicNote !==
        state.lastPlayedNote
    ) {
      dispatch({
        type: 'record-played-note',
        payload: {
          playedNote: audioEngine.state.context.audioEngine.currentMusicNote
        }
      });
    }
  }, [audioEngine, state, dispatch]);

  return [state, dispatch];
}
