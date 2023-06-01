
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.opensheetMusicDisplayMachine.initializing:invocation[0]": { type: "done.invoke.opensheetMusicDisplayMachine.initializing:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "initialize": "done.invoke.opensheetMusicDisplayMachine.initializing:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "moveCursorToMeasure": "cursor.moveToMeasure";
"setNotesUnderCursor": "cursor.hide" | "cursor.next" | "cursor.prev" | "cursor.show" | "cursor.toggle" | "done.invoke.opensheetMusicDisplayMachine.initializing:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "initialize": "initialize";
        };
        matchesStates: "error" | "idle" | "initializing" | "uninitialized";
        tags: never;
      }
  