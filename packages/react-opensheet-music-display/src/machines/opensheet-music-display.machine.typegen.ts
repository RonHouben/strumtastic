
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.opensheetMusicDisplayMachine.initializing:invocation[0]": { type: "done.invoke.opensheetMusicDisplayMachine.initializing:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.opensheetMusicDisplayMachine.initializing:invocation[0]": { type: "error.platform.opensheetMusicDisplayMachine.initializing:invocation[0]"; data: unknown };
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
          "resetContext": "reset";
"setDarkmode": "set.theme";
"setError": "error.platform.opensheetMusicDisplayMachine.initializing:invocation[0]";
"setInitialContext": "done.invoke.opensheetMusicDisplayMachine.initializing:invocation[0]";
"spawnCursorMachine": "done.invoke.opensheetMusicDisplayMachine.initializing:invocation[0]";
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
  