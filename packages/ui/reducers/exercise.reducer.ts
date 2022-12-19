import { IMusicNote } from 'music-notes/types';

export type ExerciseReducerState = {
  name: string;
  key: string;
  notesToPlay: IMusicNote[] | [];
  playedNotes: IMusicNote[] | [];
  nextNoteToPlay: IMusicNote | undefined;
  isInitialised: boolean;
  isDone: boolean;
  mistakes: number;
};

export type ExerciseReducerAction =
  | {
      type: 'initialise-exercise';
      payload: Pick<
        ExerciseReducerState,
        'name' | 'key' | 'notesToPlay' | 'nextNoteToPlay'
      >;
    }
  | { type: 'record-played-note'; payload: { playedNote: IMusicNote } };

export const exerciseReducerInitialState: ExerciseReducerState = {
  isInitialised: false,
  isDone: false,
  key: '',
  name: '',
  nextNoteToPlay: undefined,
  notesToPlay: [],
  playedNotes: [],
  mistakes: 0
};

export function exerciseReducer(
  state: ExerciseReducerState,
  action: ExerciseReducerAction
): ExerciseReducerState {
  switch (action.type) {
    case 'initialise-exercise':
      return { ...state, ...action.payload, isInitialised: true };
    case 'record-played-note':
      if (!state.nextNoteToPlay) {
        return { ...state, isDone: true };
      }

      const hasPlayedCorrectNote =
        action.payload.playedNote.hz === state.nextNoteToPlay.hz;

      if (hasPlayedCorrectNote) {
				// calculate the nextNoteToPlay
        const currentNoteIndex = state.notesToPlay.findIndex(
          (note) => note.hz === action.payload.playedNote.hz
        );
        const nextNoteToPlay = state.notesToPlay.at(currentNoteIndex + 1);

        return {
          ...state,
          playedNotes: [...state.playedNotes, action.payload.playedNote],
          nextNoteToPlay
        };
      }

      return {
        ...state,
        mistakes: !hasPlayedCorrectNote ? state.mistakes + 1 : state.mistakes
      };

    default:
      throw new Error(
        `Action Type "${
          (action as ExerciseReducerAction).type
        }" is not implemented!`
      );
  }
}
