import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import { ActorRefFrom, assign, createMachine, spawn } from 'xstate';
import { cursorMachine } from './cursor.machine';
import type { IOSMDOptions } from 'opensheetmusicdisplay';

type Context = {
  osmd: OpenSheetMusicDisplay;
  cursorMachine: ActorRefFrom<typeof cursorMachine>;
  error?: Error;
  musicXml: string | Document;
};

type Services = {
  initialize: {
    data: { osmd: Context['osmd']; musicXml: Context['musicXml'] };
  };
};

type Events =
  | {
      type: 'initialize';
      payload: {
        options: IOSMDOptions;
        containerRef: HTMLDivElement;
        musicXml: Context['musicXml'];
      };
    }
  | { type: 'reset' }
  | { type: 'set.theme'; payload: { theme: 'light' | 'dark' } }
  | { type: 'cursor.show' }
  | { type: 'cursor.hide' }
  | { type: 'cursor.next' }
  | { type: 'cursor.prev' }
  | { type: 'cursor.moveToMeasure'; payload: { measureIndex: number } }
  | { type: 'cursor.data' };

export const openSheetMusicDisplayMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGiwAcwNYALMMAFwFkBXWASwGMARR2QgGwEMBPGj2ZlGGMPhCEsTKoywYJAD0QBGAEzo+qtcl3IgA */
    id: 'opensheetMusicDisplayMachine',
    description: 'The state machine for the OpenSheetMusicDisplay component',
    predictableActionArguments: true,
    tsTypes: {} as import('./opensheet-music-display.machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      services: {} as Services,
      events: {} as Events
    },
    context: {
      osmd: {} as Context['osmd'],
      cursorMachine: {} as Context['cursorMachine'],
      error: undefined,
      musicXml: ''
    },
    initial: 'uninitialized',
    on: {
      reset: {
        target: 'uninitialized',
        actions: 'resetContext'
      }
    },
    states: {
      uninitialized: {
        on: {
          initialize: 'initializing'
        }
      },
      initializing: {
        invoke: {
          src: 'initialize',
          onDone: {
            actions: ['setInitialContext', 'spawnCursorMachine'],
            target: 'idle'
          },
          onError: {
            target: 'error'
          }
        }
      },
      idle: {
        on: {
          'cursor.show': {
            actions: (ctx) => ctx.cursorMachine.send('show')
          },
          'cursor.hide': {
            actions: (ctx) => ctx.cursorMachine.send('hide')
          },
          'cursor.next': {
            actions: (ctx) => ctx.cursorMachine.send('moveToNext')
          },
          'cursor.prev': {
            actions: (ctx) => ctx.cursorMachine.send('moveToPrevious')
          },
          'cursor.moveToMeasure': {
            actions: (ctx, event) =>
              ctx.cursorMachine.send({
                type: 'moveToMeasure',
                payload: event.payload
              })
          },
          'cursor.data': {
            actions: (ctx) => ctx.cursorMachine.send('logData')
          },
          'set.theme': {
            actions: ['setDarkmode']
          }
        }
      },
      error: {
        entry: ['setError'],
      }
    }
  },
  {
    services: {
      initialize: async (_ctx, event) => {
        const osmd = new OpenSheetMusicDisplay(
          event.payload.containerRef,
          event.payload.options
        );

        await osmd.load(event.payload.musicXml);

        osmd.render();

        return { osmd, musicXml: event.payload.musicXml };
      }
    },
    actions: {
      setInitialContext: assign((_ctx, event) => ({
        osmd: event.data.osmd,
        musicXml: event.data.musicXml
      })),
      setDarkmode: (ctx, event) => {
        ctx.osmd.setOptions({ darkMode: event.payload.theme === 'dark' });
        ctx.osmd.render();
      },
      spawnCursorMachine: assign((ctx) => ({
        cursorMachine: spawn(
          cursorMachine.withContext({
            cursor: ctx.osmd.cursor,
            notesUnderCursor: [],
            repetition: {
              startRepeatSignIndex: -1,
              currentRepeat: 0,
              maxRepeats: 1
            }
          }),
          {
            name: 'cursorMachine'
          }
        )
      })),
      resetContext: assign((ctx) => ({
        osmd: {} as Context['osmd'],
        cursorMachine: {} as Context['cursorMachine'],
        musicXml: '',
        error: undefined,
      })),
      setError: assign({
        error: (_ctx, event) => {
          return event.data as Error;
        }
      })
    }
  }
);
