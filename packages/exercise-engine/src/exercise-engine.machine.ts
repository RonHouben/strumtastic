import { IMusicNote, MusicKey, MusicNotes, NoteNameWithOctave } from 'music-notes';
import { createMachine, assign } from 'xstate';

export type CreateExercise = {
  id: string;
  title: string;
  key: MusicKey;
  notesToPlay: NoteNameWithOctave[];
};

interface Exercise extends Omit<CreateExercise, 'notesToPlay'> {
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
      data: { exercise: CreateExercise };
    }
  | { type: 'START_EXERCISE' }
  | { type: 'RECORD_PLAYED_NOTE'; data: { playedNote: IMusicNote } }
  | { type: 'PAUSE_EXERCISE' }
  | { type: 'CONTINUE_EXERCISE' }
  | { type: 'STOP_EXERCISE' };

export const exerciseEngineMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5RgB5gE4GMCWswFEA7KbQsAWQENMALUsAOgFdDTsAXbSgG2wC9IAYgCSAOWEAVYQEEAMsIBa+ANoAGALqJQABwD2sDtl2EtIFIgCMADgDMDKxYBMAVgA0IAJ6Irqhs4C+-u6oGDh4RCRkVLT0DGycPPykUIIAIgDyovgA+mKSMvIKYgDiappIIHoGnMam5ggALM6+DU02Tm6e3r4BQeBoWLgExPTRdGRxENxgggDKEtIAShLZ+AAa+IuziioaplWGtRX1AOw2AJz251YNNiedXgg+foF9hLoQcKYhg+EjUdRxmB9vpDiZjogALQANncjxhgWCAzCw0iFEBsRY8S4vAEEBB1SM4NA9Qajjh3gsiP6oSGEVGGIm2MSfGSBLBdUQNkcjj8JwcLgpTypfR+KPpAJiTKmwIqBxqxLMiGhzmhDAuNzuD0p1LFdP+6KljHQLFYxHwyKG7IVnIQ50cl1Uqn5HSFDle-iAA */

  /** @xstate-layout N4IgpgJg5mDOIC5RgB5gE4GMCWswFEA7KbQsAWQENMALUsAOmwgBswBiAZQBUBBAJW4B9fAA18-AMIBJTvgDaABgC6iUAAcA9rGwAXbJsJqQKRAFYzATgaKAHFYDMAdjMAaEAE9EAJgdmbDgBsACxmtg4RkQ4AjAC+se6oGDh4RCRkVLT0TKwcADIA8rwAIiLiUrIKKsZaOvqGxqYIDrbRDA7Bzm6eiNHegfGJaFi4BMT0mXRkDEkjAF6kUOz8+JIF-KUACnm8AJr4pQByBdxVqkggtXoGRhdNloreDNEhioHe3V4IH8EM4VEAiJxBLgYYpMbpCjUKaMWY4BbEdibXgAVTkZQkMjkSnOGm01wad0QTkU-jMiicrQ+7i+wScgQYZiCoX+AMGoOSozSE2h2Th2ARSx4BU2GIq2OqFyu9VuoCaTmiv28-TM70+vVsvyZITCgJi7P5qXGGV5035gvYOJq+JljV6HzaZl8nRcNMQflsAR1rKiBrBXONUKy03UlAArngIOw1oduNJDij8GKsWdrXUbnaEC9foFLEy+urmhYGJTvXq-ZyjZDJtlQxHIFxuCLk5UrVKbRmiVmQgxc-nqT1vtFrCSYh94iDCJoIHBjIaITzg2A0wTZSZEABaQJuhBbisjKuLmE5Ngr21d4LeT3BEKaro75VOBihMdmffg7kmpczf2Cs+duVekUPpn37Qs-AZK8y0Bd8A2rU1GDrSN-0JQCEEvHcb09QJAkVXUYJBedPyDY8IEMZd23TVD1yzLobCw11BwghgoJZcsJyAA */
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
