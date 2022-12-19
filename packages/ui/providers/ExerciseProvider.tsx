import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { useMusicNotes } from '../hooks/useMusicNotes';
import {
  exerciseReducer,
  ExerciseReducerAction,
  exerciseReducerInitialState,
  ExerciseReducerState
} from '../reducers/exercise.reducer';

export interface IExerciseContext {
  state: ExerciseReducerState;
  dispatch: React.Dispatch<ExerciseReducerAction>;
}

export const ExerciseContext = createContext<IExerciseContext>(
  {} as IExerciseContext
);

interface Props {
  children: ReactNode;
}

export function ExerciseProvider({ children }: Props) {
  const { getMusicNotesByNoteNames, getMusicNoteByNoteName } = useMusicNotes();
  const [state, dispatch] = useReducer(
    exerciseReducer,
    exerciseReducerInitialState
  );

  useEffect(() => {
    if (state.isInitialised === false) {
      dispatch({
        type: 'initialise-exercise',
        payload: {
          key: 'C',
          name: 'C Major Scale',
          notesToPlay: getMusicNotesByNoteNames(['C', 'D', 'E'], 3, 1),
          nextNoteToPlay: getMusicNoteByNoteName('C'),
        }
      });
    }
  }, [state.isInitialised, dispatch, getMusicNotesByNoteNames, getMusicNoteByNoteName]);

  return (
    <ExerciseContext.Provider
      value={{
        dispatch,
        state
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}