import {
  OpenSheetMusicDisplay,
  IOSMDOptions,
  Note
} from 'opensheetmusicdisplay';
import { assign, createMachine } from 'xstate';
import { MusicNotes, IMusicNote } from 'music-notes';

type Context = {
  osmd: OpenSheetMusicDisplay;
  error?: Error;
  musicXml: string | Document;
  containerId: string;
  options: IOSMDOptions;
  cursor: {
    notes: Note[];
    musicNotes: IMusicNote[];
  };
};

type Services = {
  initialize: { data: OpenSheetMusicDisplay };
};

type Events =
  | { type: 'initialize' }
  | { type: 'cursor.show' }
  | { type: 'cursor.hide' }
  | { type: 'cursor.toggle' }
  | { type: 'cursor.next' }
  | { type: 'cursor.prev' };

type Actions = { type: 'initialize' };

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
      events: {} as Events,
      actions: {} as Actions
    },
    context: {
      osmd: undefined as unknown as OpenSheetMusicDisplay,
      error: undefined,
      containerId: '',
      musicXml: '',
      options: {},
      cursor: {
        notes: [],
        musicNotes: []
      }
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
            actions: [assign((_ctx, event) => ({ osmd: event.data })), 'setNotesUnderCursor'],
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
            actions: [(ctx) => ctx.osmd.cursor.show(), 'setNotesUnderCursor']
          },
          'cursor.hide': {
            actions: [(ctx) => ctx.osmd.cursor.hide(), 'setNotesUnderCursor']
          },
          'cursor.toggle': {
            actions: [
              (ctx) =>
                ctx.osmd.cursor.hidden
                  ? ctx.osmd.cursor.show()
                  : ctx.osmd.cursor.hide(),
              'setNotesUnderCursor'
            ]
          },
          'cursor.next': {
            actions: [(ctx) => ctx.osmd.cursor.next(), 'setNotesUnderCursor']
          },
          'cursor.prev': {
            actions: [
              (ctx) => ctx.osmd.cursor.previous(),
              'setNotesUnderCursor'
            ]
          }
        }
      },
      error: {}
    }
  },
  {
    services: {
      initialize: async (ctx) => {
        const osmd = new OpenSheetMusicDisplay(ctx.containerId, ctx.options);
        await osmd.load(ctx.musicXml);

        osmd.render();

        // show cursor
        osmd.cursor.show();

        // This is a work-around because TailwindCSS sets the height of all img elements to auto
        const height = osmd!.cursor.cursorElement.getAttribute('height');
        osmd.cursor.cursorElement.style.height = `${height}px`;

        return osmd;
      }
    },
    actions: {
      setNotesUnderCursor: assign((ctx) => {
				const notes = ctx.osmd.cursor.NotesUnderCursor();
				
				return {
        	cursor: {
          	notes,
						musicNotes: notes.map((note) => MusicNotes.getMusicNoteFromFrequency(note.Pitch.Frequency)) 
        	}
				}
			}),
    }
  }
);
