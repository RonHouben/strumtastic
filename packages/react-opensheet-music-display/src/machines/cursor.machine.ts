import { assign, createMachine } from 'xstate';
import type { Cursor } from 'opensheetmusicdisplay';
import { IMusicNote, MusicNotes } from 'music-notes';

type Context = {
  cursor: Cursor;
  notesUnderCursor: IMusicNote[];
  repetition: {
    startRepeatSignIndex: number;
    maxRepeats: number;
    currentRepeat: number;
  };
};

type Events =
  | {
      type: 'show';
    }
  | { type: 'hide' }
  | { type: 'toggle' }
  | { type: 'moveToNext' }
  | { type: 'moveToPrevious' }
  | { type: 'moveToMeasure'; payload: { measureIndex: number } }
  | { type: 'logData' };

export const cursorMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgGMBXAJ1ixIFkBDAgCwEsMx8QAHLWBgFwaw1YAPRAEYATOgCeoscjnIgA */
    id: 'cursorMachine',
    description:
      'This manages the cursor for the OpensheetMusicDisplay machine',
    tsTypes: {} as import('./cursor.machine.typegen').Typegen0,
    predictableActionArguments: true,
    schema: {
      context: {} as Context,
      events: {} as Events
    },
    context: {
      cursor: {} as Cursor,
      notesUnderCursor: [],
      repetition: {
        startRepeatSignIndex: -1,
        currentRepeat: 0,
        maxRepeats: 1
      }
    },
    initial: 'idle',
    states: {
      idle: {
        entry: ['show', 'styleCursorElement', 'setNotesUnderCursor'],
        on: {
          show: {
            actions: ['show', 'styleCursorElement', 'setNotesUnderCursor']
          },
          hide: {
            actions: ['hide', 'styleCursorElement', 'setNotesUnderCursor']
          },
          toggle: {
            actions: ['toggle', 'setNotesUnderCursor', 'styleCursorElement']
          },
          moveToNext: [
            {
              cond: 'hasToRepeat',
              actions: [
                'incrementCurrentRepeat',
                'moveToMeasure',
                'show',
                'setNotesUnderCursor'
              ]
            },
            {
              actions: ['moveToNext', 'setNotesUnderCursor']
            }
          ],
          moveToPrevious: {
            actions: ['moveToPrevious', 'setNotesUnderCursor']
          },
          moveToMeasure: {
            actions: ['moveToMeasure', 'show', 'setNotesUnderCursor']
          },
          logData: {
            actions: ['logData']
          }
        }
      }
    }
  },
  {
    actions: {
      styleCursorElement: (ctx) => {
        // This is a work-around because TailwindCSS sets the height of all img elements to auto
        const height = ctx.cursor.cursorElement.getAttribute('height');
        ctx.cursor.cursorElement.style.height = `${height}px`;
      },
      show: (ctx) => {
        ctx.cursor.show();
      },
      hide: (ctx) => {
        ctx.cursor.hide();
      },
      toggle: (ctx) => {
        if (ctx.cursor.hidden || ctx.cursor.hidden === undefined) {
          ctx.cursor.show();

          return false;
        } else {
          ctx.cursor.hide();

          return true;
        }
      },
      setNotesUnderCursor: assign({
        notesUnderCursor: (ctx) => {
          const notes = ctx.cursor.NotesUnderCursor();

          return notes.map((note) =>
            note.Pitch
              ? MusicNotes.getMusicNoteFromFrequency(note.Pitch.Frequency)
              : MusicNotes.getMusicNoteFromFrequency(0, true)
          );
        }
      }),
      moveToNext: assign((ctx) => {
        ctx.cursor.next();

        return {
          repetition: {
            ...ctx.repetition,
            startRepeatSignIndex:
              ctx.cursor.iterator.CurrentMeasure.FirstRepetitionInstructions[0]
                ?.measureIndex || ctx.repetition.startRepeatSignIndex
          }
        };
      }),
      moveToPrevious: (ctx) => {
        ctx.cursor.previous();
      },
      moveToMeasure: (ctx, event) => {
        let direction: 'forward' | 'backwards' | undefined;

        const measureIndex =
          event.type === 'moveToMeasure'
            ? event.payload.measureIndex
            : ctx.repetition.startRepeatSignIndex;

        // forwards
        while (ctx.cursor.iterator.CurrentMeasureIndex < measureIndex) {
          ctx.cursor.iterator.moveToNext();
        }

        // backwards
        while (ctx.cursor.iterator.CurrentMeasureIndex > measureIndex) {
          direction = 'backwards';

          ctx.cursor.iterator.moveToPrevious();
        }

        if (
          ctx.cursor.iterator.CurrentMeasureIndex === measureIndex &&
          direction === 'backwards'
        ) {
          const amountOfNotesInMeasure =
            ctx.cursor.iterator.CurrentMeasure.VerticalMeasureList[0]
              .staffEntries.length;

          // `let i = 1` is necessary because we should end up on the first note of the measure
          for (let i = 1; i < amountOfNotesInMeasure; i++) {
            ctx.cursor.iterator.moveToPrevious();
          }
        }

        if (
          ctx.cursor.iterator.CurrentMeasureIndex === measureIndex &&
          direction === undefined
        ) {
          // ts-ignore is necessary, since `currentVoiceEntryIndex` is private
          let currentNoteIndex: number =
            // @ts-ignore
            ctx.cursor.iterator.currentVoiceEntryIndex;

          while (currentNoteIndex !== 0) {
            ctx.cursor.iterator.moveToPrevious();
            // @ts-ignore
            currentNoteIndex = ctx.cursor.iterator.currentVoiceEntryIndex;
          }
        }
      },
      logData: (ctx) => {
        console.log({
          cursor: ctx.cursor,
          notesUnderCustor: ctx.cursor.NotesUnderCursor(),
          gnotesUnderCursor: ctx.cursor.GNotesUnderCursor()
        });
      },
      incrementCurrentRepeat: assign({
        repetition: (ctx) => ({
          ...ctx.repetition,
          currentRepeat: ctx.repetition.currentRepeat + 1
        })
      })
    },
    guards: {
      hasToRepeat: (ctx) => {
        const currentMeasureIndex = ctx.cursor.iterator.CurrentMeasureIndex;

        const endRepetitionMeasureIndex =
          ctx.cursor.iterator.CurrentMeasure.LastRepetitionInstructions[0]
            ?.measureIndex || undefined;

        if (currentMeasureIndex === endRepetitionMeasureIndex) {
          const amountOfNotesInMeasure =
            ctx.cursor.iterator.CurrentMeasure.VerticalMeasureList[0]
              .staffEntries.length - 1;

          // ts-ignore is necessary, since `currentVoiceEntryIndex` is private
          const currentNoteIndex: number =
            // @ts-ignore
            ctx.cursor.iterator.currentVoiceEntryIndex;

          if (
            currentNoteIndex === amountOfNotesInMeasure &&
            ctx.repetition.currentRepeat < ctx.repetition.maxRepeats
          ) {
            return true;
          }
        }

        return false;
      }
    }
  }
);
