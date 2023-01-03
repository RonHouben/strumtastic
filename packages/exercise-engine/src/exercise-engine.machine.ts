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
  
/** @xstate-layout N4IgpgJg5mDOIC5RgB5gE4GMCWswFEA7KbQsAWQENMALUsAOmwgBswBiAZQBUBBAJW4B9fAA18-AMIBJTvgDaABgC6iUAAcA9rGwAXbJsJqQKRAFYzATgaKAHFYDMF2-cu2ATABoQAT0TunGwcANgAWYMVLB3d3AEZbUIBfRO9UDBw8IhIyKlp6JlYOABkAeV4AERFxKVkFFWMtHX1DY1MEB1tYhgdQhwB2MxjXPstY7z8EWPdgm0U5+ItQyzM+xXdk1LQsXAJiely6MgY07YAvUih2fnxJEv5KgAUi3gBNfEqAORLuOtUkEEaegMRn+bUsawYsTCimCzhCCVs438ZlCDFsDgxfT6sUUgwclj6tg24C2GV22Qo1EOjBOOHOxHYD14AFU5FUJDI5Eo-hptECWqDEKszAwzIpCU5Qn0pT1gkiEFKZmYQktlbD3LY+sTaTssvsqfkdfTLjwSg92TUufV-oDmiDQG1saiYsFgtNInFgh15fFUWrFQFooSkikSeldXscgajkaLuxuQ0+XbWogpuDum5eujBrFwV5fIgnLYgmFpZYorZLO4taGdZlI5S8kd1JQAK54CDsW4fbjSD7M-AWzm-RNNYEpyZhBjBZYOGHxYMJfMTJwiwmwxRz2JmTo1zbh+sUg75FvtyBcbhmoe1BM2pPjwWT1Ez5XzzUI0LL-y5hirBzbmJRjmYJbGCZJQ0ITQIDgYw63JfUmzAUd+XtExEAAWjlAsEEw7VSQjI9o0YZg2GQ5NH0-YtwlCdFYn6ZVwVheUYj6BhQmVWJQi42FlU-Mw8IPeCo0Q458ONMiHwdVNNy6SsYVdHEsyxeUnBmDUNy3HcoWWATtkPBDqQYU8OwkgUpIVL8FRA6dgk48tc1xQZdLJPVhMMiBDCQu8xzMtDJlCOiGCrX1YVA-8+hUsw1NAsVNM6F9wMSIA */
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
