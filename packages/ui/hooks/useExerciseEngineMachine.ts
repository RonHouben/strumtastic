import { useContext } from 'react';
import { GlobalStateContext } from '../providers/GlobalStateProvider';
import { useActor, useSelector, useMachine } from '@xstate/react';
import { exerciseEngineMachine } from 'exercise-engine';

// The isExercisingSelector is created for performance reasons.
// See:
// https://xstate.js.org/docs/recipes/react.html#improving-performance

type ExerciseEngineState = ReturnType<
  typeof useMachine<typeof exerciseEngineMachine>
>[0];
type ExerciseEngineSend = ReturnType<
  typeof useMachine<typeof exerciseEngineMachine>
>[1];

const isExercisingSelector = (state: ExerciseEngineState) =>
  state.matches('exercizing');

interface UseExerciseEngineResult {
  state: ExerciseEngineState;
  send: ExerciseEngineSend;
  isExercising: boolean;
}

export function useExerciseEngineMachine(): UseExerciseEngineResult {
  const { exerciseEngineService } = useContext(GlobalStateContext);
  const isExercising = useSelector(exerciseEngineService, isExercisingSelector);

  const [state, send] = useActor(exerciseEngineService);

  return { state, send, isExercising };
}
