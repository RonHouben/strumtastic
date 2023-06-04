
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "hide": "hide";
"incrementCurrentRepeat": "moveToNext";
"logData": "logData";
"moveToMeasure": "moveToMeasure" | "moveToNext";
"moveToNext": "moveToNext";
"moveToPrevious": "moveToPrevious";
"setNotesUnderCursor": "hide" | "moveToMeasure" | "moveToNext" | "moveToPrevious" | "show" | "toggle" | "xstate.init";
"show": "moveToMeasure" | "moveToNext" | "show" | "xstate.init";
"styleCursorElement": "hide" | "show" | "toggle" | "xstate.init";
"toggle": "toggle";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "hasToRepeat": "moveToNext";
        };
        eventsCausingServices: {
          
        };
        matchesStates: "idle" | "initializing";
        tags: never;
      }
  