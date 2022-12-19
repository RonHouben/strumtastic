import { IMusicNote } from "music-notes/types";

export type ExerciseReducerState = {
	name: string;
	key: string;
	notesToPlay: IMusicNote[] | [];
	playedNotes: IMusicNote[] | [];
	nextNoteToPlay: IMusicNote | null;
	isDone: boolean;
}

export type ExerciseReducerAction = { type: 'create-exercise' }

export const exerciseReducerInitialState: ExerciseReducerState = {
	isDone: false,
	key: '',
	name: '',
	nextNoteToPlay: null,
	notesToPlay: [],
	playedNotes: [],
}

export function exerciseReducer(state: ExerciseReducerState, action: ExerciseReducerAction): ExerciseReducerState {
	return state;
}