import { IMusicNote } from 'music-notes';

export type ExerciseReducerState = {
  name: string;
  key: string;
  notesToPlay: IMusicNote[] | [];
  playedNotes: IMusicNote[] | [];
  nextNoteToPlay: IMusicNote | undefined;
  isInitialised: boolean;
  isDone: boolean;
  mistakes: number;
  lastPlayedNote: IMusicNote | null;
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
  mistakes: 0,
  lastPlayedNote: null
};

export function exerciseReducer(
  state: ExerciseReducerState,
  action: ExerciseReducerAction
): ExerciseReducerState {
  switch (action.type) {
    case 'initialise-exercise':
      if (action.payload.notesToPlay.length === 0) {
        throw new Error('"payload.notesToPlay" should not be empty!')
      }

      return { ...state, ...action.payload, isInitialised: true };

    case 'record-played-note':
      if (!state.isInitialised) { 
        return state;
      }

      if (!state.nextNoteToPlay) {
        return {
          ...state,
          isDone: true,
          lastPlayedNote: action.payload.playedNote
        };
      }

      const hasPlayedCorrectNote =
        action.payload.playedNote.pc === state.nextNoteToPlay.pc;

      if (hasPlayedCorrectNote) {
        // calculate the nextNoteToPlay
        const currentNoteIndex = state.notesToPlay.findIndex(
          (note) => note.pc === action.payload.playedNote.pc
        );
        const nextNoteToPlay = state.notesToPlay.at(currentNoteIndex + 1);

        return {
          ...state,
          playedNotes: [...state.playedNotes, action.payload.playedNote],
          nextNoteToPlay,
          lastPlayedNote: action.payload.playedNote
        };
      }

      // incorrect note has been played so + 1 to mistakes
      return {
        ...state,
        mistakes: state.mistakes + 1,
        lastPlayedNote: action.payload.playedNote
      };

    default:
      throw new Error(
        `Action Type "${
          (action as ExerciseReducerAction).type
        }" is not implemented!`
      );
  }
}
