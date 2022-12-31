'use client';

import { useContext, useEffect } from 'react';
import {
  ExerciseContext,
  IExerciseContext
} from '../providers/ExerciseProvider';
import { useMusicNotes } from './useMusicNotes';

export function useExercise(): IExerciseContext {
  const [state, dispatch] = useContext(ExerciseContext);
  const { currentMusicNote } = useMusicNotes();

  useEffect(() => {
    if (
      state.isInitialised &&
      !state.isDone &&
      currentMusicNote &&
      currentMusicNote !== state.lastPlayedNote
    ) {

      dispatch({
        type: 'record-played-note',
        payload: {
          playedNote: currentMusicNote
        }
      });
    }
  }, [state, dispatch, currentMusicNote]);

  return [state, dispatch];
}
