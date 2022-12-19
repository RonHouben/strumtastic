import { useContext } from "react";
import { ExerciseContext } from "../providers/ExerciseProvider";

export function useExercise() {
	return useContext(ExerciseContext);
}