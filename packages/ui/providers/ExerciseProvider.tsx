import { createContext, ReactNode, useReducer } from 'react';
import {
  exerciseReducer,
  ExerciseReducerAction,
  exerciseReducerInitialState,
  ExerciseReducerState
} from '../reducers/exercise.reducer';

export type IExerciseContext = [
  ExerciseReducerState,
  React.Dispatch<ExerciseReducerAction>
];

export const ExerciseContext = createContext<IExerciseContext>(
  {} as IExerciseContext
);

interface Props {
  children: ReactNode;
}

export function ExerciseProvider({ children }: Props) {
  const reducer = useReducer(exerciseReducer, exerciseReducerInitialState);

  return (
    <ExerciseContext.Provider value={reducer}>
      {children}
    </ExerciseContext.Provider>
  );
}
