
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.configureAIPitchDetection": { type: "done.invoke.configureAIPitchDetection"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.getMicrophoneAccess": { type: "done.invoke.getMicrophoneAccess"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.initiateAIPitchDetection": { type: "done.invoke.initiateAIPitchDetection"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.updateAudioEnginePeriodically": { type: "done.invoke.updateAudioEnginePeriodically"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.configureAIPitchDetection": { type: "error.platform.configureAIPitchDetection"; data: unknown };
"error.platform.getMicrophoneAccess": { type: "error.platform.getMicrophoneAccess"; data: unknown };
"error.platform.initiateAIPitchDetection": { type: "error.platform.initiateAIPitchDetection"; data: unknown };
"error.platform.updateAudioEnginePeriodically": { type: "error.platform.updateAudioEnginePeriodically"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "configureAIPitchDetection": "done.invoke.configureAIPitchDetection";
"getMicrophoneAccess": "done.invoke.getMicrophoneAccess";
"intiateAIPitchDetection": "done.invoke.initiateAIPitchDetection";
"updateAudioEnginePeriodically": "done.invoke.updateAudioEnginePeriodically";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "createAudioEngine": "done.invoke.getMicrophoneAccess";
"setError": "error.platform.configureAIPitchDetection" | "error.platform.getMicrophoneAccess" | "error.platform.initiateAIPitchDetection";
"startListeningToMicrophone": "START_LISTENING_TO_MICROPHONE";
"stopListeningToMicrophone": "STOP_LISTENING_TO_MICROPHONE";
"updateAudioEngine": "UPDATE_AUDIO_ENGINE" | "done.invoke.configureAIPitchDetection" | "done.invoke.initiateAIPitchDetection";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "configureAIPitchDetection": "CONFIGURE_SETTINGS";
"getMicrophoneAccess": "INITIALIZE" | "RETRY_GET_MICROPHONE_ACCESS";
"intiateAIPitchDetection": "";
"updateAudioEnginePeriodically": "START_LISTENING_TO_MICROPHONE" | "UPDATE_AUDIO_ENGINE";
        };
        matchesStates: "configuringSettings" | "configuringSettings.aiPitchDetection" | "idle" | "initializing" | "initializing.AIPitchDetection" | "initializing.creatingAudioEngine" | "initializing.deniedMicrophoneAccess" | "initializing.gettingMicrophoneAccess" | "listeningToMicrophone" | "listeningToMicrophone.listening" | "unitialized" | { "configuringSettings"?: "aiPitchDetection";
"initializing"?: "AIPitchDetection" | "creatingAudioEngine" | "deniedMicrophoneAccess" | "gettingMicrophoneAccess";
"listeningToMicrophone"?: "listening"; };
        tags: never;
      }
  