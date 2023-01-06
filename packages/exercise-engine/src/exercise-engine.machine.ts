import { IMusicNote, MusicKey, MusicNotes, NoteNameWithOctave } from 'music-notes';
import { createMachine, assign } from 'xstate';

export type LoadExercise = {
  id: string;
  title: string;
  key: MusicKey;
  notesToPlay: NoteNameWithOctave[];
};

interface Exercise extends Omit<LoadExercise, 'notesToPlay'> {
  notesToPlay: IMusicNote[];
}

type Context = {
  exercise: Exercise | undefined;
  correctlyPlayedNotes: IMusicNote[];
  nextNoteToPlay: IMusicNote | undefined;
};

type Event =
  | {
      type: 'LOAD_EXERCISE';
      data: { exercise: LoadExercise };
    }
  | { type: 'START_EXERCISE' }
  | { type: 'RECORD_PLAYED_NOTE'; data: { playedNote: IMusicNote } }
  | { type: 'PAUSE_EXERCISE' }
  | { type: 'CONTINUE_EXERCISE' }
  | { type: 'STOP_EXERCISE' };

export const exerciseEngineMachine =
  
/** @xstate-layout N4IgpgJg5mDOIC5RgB5gE4GMCWswFEA7KbQsAWQENMALUsAOmwgBswBiAZQBUBBAJW4B9fAA18-AMIBJTvgDaABgC6iUAAcA9rGwAXbJsJqQKRAFYzATgaKAHFdsBGAGyLLAZkXOALABoQAJ6IAEzuZjbuzs7ulopmAOzuTo7eAL6p-qgYOHhEJGRUtPRMrBwAMgDyvAAiIuJSsgoqxlo6+obGpghJjgzu3u7xifHetsEJjmb+QQiOwc42iku28Zb2isEr6ZloWLgExPSFdGQMWXsAXqRQ7Pz4khX8tQAKZbwAmvi1AHIV3E2qJAgVp6AxGIFdWLBBgubwuZyWeKKAYI6YhMzeBi2dxhEbRRzxRxxMzbcC7HIHfIUagnRjnHBXYjsZ68ACqcjqEhkciUgI02lBHQhiCR4TMini9m8ziG3m8limgUQ3niCzMkWcwXhmvliNJ9P2eSONOKBsZNx4FWenIaPOaQJB7XBoC6hMxwXmPmCIw9cviaNmtkx6qiZh8ozMc3G+vJhsOBRNpzN13YvJaAqdnUQc1ifTWGNDCI8fiV3TMtgiUW9cNWzjmMeycapx2K6koAFc8BB2A9vtxpN9WfgbdyAem2mCs7MfAwEeqCe5HJY5qMA2FwpKop5Io4nGGG3tcvHqUVTm3O5AuNwrSPGmmHRnJ8Lp5i54vEkuV7YA1rrEj3N69gxK4AzpBkICEJoEBwMYBpHs2iZgOOgrOiYiAALTOAGmGLEseH4UsKQHhSRoJqejDMGwyGZs+3ibAw0qjHW4oev0iozB68QMeqwR0c4VgCZsxFNsa5FnLG5rUU+LrZooi5YrEIxmOMiKKLua5hgwmxbnJdZ7s4wnwaJtIMOeXZSUKMkIHRAbShWUQuPManeHJQngXBlLGcUECGEhD4TpZaGzHC7gMJYv6WAqcrFt+pZhAs2nRLpu6TAZYFAA */
createMachine(
    {
      id: 'exerciseEngineMachine',
      description: `This manages the exercises`,
      predictableActionArguments: true,
      tsTypes: {} as import('./exercise-engine.machine.typegen').Typegen0,
      schema: {
        context: {} as Context,
        events: {} as Event
      },
      context: {
        exercise: undefined,
        correctlyPlayedNotes: [],
        nextNoteToPlay: undefined
      },
      initial: 'idle',
      states: {
        idle: {
          on: {
            START_EXERCISE: {
              target: 'exercizing',
              cond: 'hasExerciseLoaded'
            },
            LOAD_EXERCISE: {
              target: 'idle',
              internal: true,
              actions: 'loadExercise'
            }
          }
        },

        exercizing: {
          always: {
            cond: 'isDone',
            target: 'done'
          },
          on: {
            RECORD_PLAYED_NOTE: {
              target: 'exercizing',
              internal: true,
              actions: 'recordPlayedNote',
              cond: 'isCorrectNotePlayed'
            },
            PAUSE_EXERCISE: {
              target: 'paused'
            },
            STOP_EXERCISE: {
              target: 'idle'
            }
          }
        },

        paused: {
          on: {
            CONTINUE_EXERCISE: {
              target: 'exercizing'
            },
            STOP_EXERCISE: {
              target: 'idle'
            }
          }
        },

        done: {}
      }
    },
    {
      actions: {
        loadExercise: assign({
          exercise: (_ctx, event) => ({
            ...event.data.exercise,
            notesToPlay: MusicNotes.getRangeOfMusicNotes(
              event.data.exercise.notesToPlay
            )
          }),
          nextNoteToPlay: (_ctx, event) =>
            MusicNotes.getMusicNoteByName(event.data.exercise.notesToPlay[0])
        }),
        recordPlayedNote: assign({
          correctlyPlayedNotes: (ctx, event) => [
            ...ctx.correctlyPlayedNotes,
            event.data.playedNote
          ],
          nextNoteToPlay: (ctx) => {
            const previousNextNoteToPlayIndex =
              ctx.exercise!.notesToPlay.findIndex(
                (note) => note.name === ctx.nextNoteToPlay!.name
              );

            return ctx.exercise!.notesToPlay.at(
              previousNextNoteToPlayIndex + 1
            );
          }
        })
      },
      guards: {
        hasExerciseLoaded: (ctx) => ctx.exercise !== undefined,
        isCorrectNotePlayed: (ctx, event) =>
          event.data.playedNote.name === ctx.nextNoteToPlay?.name,
        isDone: (ctx) => !ctx.nextNoteToPlay
      }
    }
  );
