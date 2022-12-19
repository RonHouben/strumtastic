import { createContext, ReactNode, useReducer } from 'react';
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

export const ExerciseContext = createContext<IExerciseContext>({} as IExerciseContext);

interface Props {
  children: ReactNode;
}

export function ExerciseProvider({ children }: Props) {
  const [state, dispatch] = useReducer(
    exerciseReducer,
    exerciseReducerInitialState
  );

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
