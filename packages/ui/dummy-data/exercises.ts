import { LoadExercise } from "exercise-engine";
import { SelectOption } from "../components/Select/Select";

export interface ExerciseOption extends SelectOption, LoadExercise {}

export const exercises: ExerciseOption[] = [
  {
    id: '1',
    disabled: false,
    title: 'C Major Triads',
    key: 'C major',
    notesToPlay: ['C3', 'E3', 'G3']
  },
  {
    id: '1',
    disabled: true,
    title: 'C Major (Ionian) scale',
    key: 'C major',
    notesToPlay: []
  }
];