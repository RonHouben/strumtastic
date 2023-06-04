import {
  OpenSheetMusicDisplay,
  IOSMDOptions,
} from 'opensheetmusicdisplay';
import { ActorRefFrom, assign, createMachine, spawn } from 'xstate';
import { cursorMachine } from './cursor.machine';

type Context = {
  osmd: OpenSheetMusicDisplay;
  cursorRef: ActorRefFrom<typeof cursorMachine>;
  error?: Error;
  musicXml: string | Document;
  containerId: string;
};

type Services = {
  initialize: { data: OpenSheetMusicDisplay };
};

type Events =
  | { type: 'initialize', payload: { options: IOSMDOptions } }
  | { type: 'cursor.show' }
  | { type: 'cursor.hide' }
  | { type: 'cursor.next' }
  | { type: 'cursor.prev' }
  | { type: 'cursor.moveToMeasure'; payload: { measureIndex: number } }
  | { type: 'cursor.data' };

export const opensheetMusicDisplayMachine = createMachine(
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
      containerId: '',
      musicXml: '',
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
          }
        }
      },
      error: {}
    }
  },
  {
    services: {
      initialize: async (ctx, event) => {
        const osmd = new OpenSheetMusicDisplay(ctx.containerId, event.payload.options);
        await osmd.load(ctx.musicXml);

        osmd.render();

        return osmd;
      }
    },
    actions: {
      setInitialContext: assign((_ctx, event) => ({ osmd: event.data })),
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
