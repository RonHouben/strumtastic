import { OpenSheetMusicDisplay, IOSMDOptions } from 'opensheetmusicdisplay';
import { ActorRefFrom, assign, createMachine, spawn } from 'xstate';
import { cursorMachine } from './cursor.machine';
import { MutableRefObject } from 'react';

type Context = {
  osmd: OpenSheetMusicDisplay;
  cursorRef: ActorRefFrom<typeof cursorMachine>;
  error?: Error;
  musicXml: string | Document;
};

type Services = {
  initialize: { data: OpenSheetMusicDisplay };
};

type Events =
  | {
      type: 'initialize';
      payload: {
        options: IOSMDOptions;
        containerRef: MutableRefObject<HTMLDivElement>;
        musicXml: Context['musicXml'];
      };
    }
  | { type: 'set.theme'; payload: { theme: 'light' | 'dark' | 'system' } }
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
      osmd: {} as unknown as Context['osmd'],
      cursorRef: {} as Context['cursorRef'],
      error: undefined,
      musicXml: ''
    },
    initial: 'uninitialized',
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
            actions: assign((_ctx, event) => ({ error: event.data })),
            target: 'error'
          }
        }
      },
      idle: {
        on: {
          'cursor.show': {
            actions: (ctx) => ctx.cursorRef.send('show')
          },
          'cursor.hide': {
            actions: (ctx) => ctx.cursorRef.send('hide')
          },
          'cursor.next': {
            actions: (ctx) => ctx.cursorRef.send('moveToNext')
          },
          'cursor.prev': {
            actions: (ctx) => ctx.cursorRef.send('moveToPrevious')
          },
          'cursor.moveToMeasure': {
            actions: (ctx, event) =>
              ctx.cursorRef.send({
                type: 'moveToMeasure',
                payload: event.payload
              })
          },
          'cursor.data': {
            actions: (ctx) => ctx.cursorRef.send('logData')
          },
          'set.theme': {
            actions: ['setDarkmode']
          }
        }
      },
      error: {}
    }
  },
  {
    services: {
      initialize: async (_ctx, event) => {
        const osmd = new OpenSheetMusicDisplay(
          event.payload.containerRef.current,
          event.payload.options
        );

        await osmd.load(event.payload.musicXml);

        osmd.render();

        return osmd;
      }
    },
    actions: {
      setInitialContext: assign((_ctx, event) => ({ osmd: event.data })),
      setDarkmode: (ctx, event) => {
        ctx.osmd.setOptions({ darkMode: event.payload.theme === 'dark' });
        // ctx.osmd.updateGraphic()
        // ctx.osmd.render();
      },
      spawnCursorMachine: assign((ctx) => ({
        cursorRef: spawn(
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
      }))
    }
  }
);
