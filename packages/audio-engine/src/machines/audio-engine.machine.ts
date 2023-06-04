import { assign, createMachine } from 'xstate';
import { AudioEngine } from '..';

type Context = {
  audioEngine: AudioEngine | undefined;
  updateAudioEngineInterval: number;
  error: Error | undefined;
  mlModelUrl: string;
};

type Service = {
  getMicrophoneAccess: { data: MediaStream; onError: Error };
  updateAudioEnginePeriodically: any;
  configureAIPitchDetection: { data: { useAIPitchDetection: boolean } };
};

type Events =
  | { type: 'INITIALIZE' }
  | { type: 'RETRY_GET_MICROPHONE_ACCESS' }
  | { type: 'START_LISTENING_TO_MICROPHONE' }
  | { type: 'CONFIGURE_SETTINGS' }
  | { type: 'UPDATE_AUDIO_ENGINE'} 
  | { type: 'STOP_LISTENING_TO_MICROPHONE' };

export const audioEngineMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEECuECWB7AogOygzzAFkBDAYwAsiwA6VPDAFwzIBsMAvSAYgEkAcvwAq-ZABl+ALRwBtAAwBdRKAAOWWC2x5VIAB6IAjAHYArHXMmTATgDMN6wCYbCgGxOANCACeiOwAsFiYKdkZmAR5ugWamAL5x3miYuAS05NS0dETaHNxEUHQwzKwEJBgUAE5YalRYxMgUFHCwvBD19EQAblgA1vTF5VU1dQ1NLYoqSCAaWqz1eoYI5hZmToFOAQEAHAF2Ll6+iAGhdE6hRnYhbkYKNtt2ZglJ6Nj4hMQZNMTZTKx5XAKRTAJQKQ2qtQ6jWasFaYEq1UqdDU7DIzAAZlhKgBbYHMcEjKHjWGTPSzbQLaZLFZ0NYbLa7fY2Q5+BBmEwBWl2NwBdYKEzbbYuIzPEDJN5pT6Ub6dP5sTiAgh0KpgNEFcWpD5gXik6bk+a6KnGdl2Oj7bbhNwKNYKIwBbysk6m85hK7uW73R6ijXvdLSrI5f4KoHIfgABRY1AAIiCwBQDW0Or8ev1frlmGBQxHmNHY-GdLr1JoKYbQEtzjYbHQAnbNqZ2dsTEYHf5HHQefsTOcu04hd7Xpq-ZkfoH5fklVnI1QYxn8-VePDEcjURisbjR2jM+GpzO4wbCzNiwbFsZzJZ2bYHM5XB4WwgjE43HQFC-bUZok5e9szHZ+ylfVKw6yrkwZKhAYBMJABKQmMMKtAASjgIjwQAmgA+gA4khaEkPwADC8EAPJhgAEoRgg4GhyB4XhOAAMp0Qe+o6CeyxmKs6y8gyewHHeaycqEPI2Oyva2Lsf4SlqXwBhA7DanRIjIPBIhoVICk4MIggYWhIiETh+FEaR5HyMoZJHixRpsvydCVrZQQhGY-LNkc96Pk+LqfjYNxmDYNZOBJg6ATK2SydqeHkQAYvwGEAKqIWhdFIWIWmMaZermZSZaIByFheY2P6mA85wssYTjhJYoR2Aon5uD5txPIkYoDgBpD+j8nCwBmTAECIWDQaM8m6WGqn8Opmnabp+kEcRZEUUxGWlgYiCOSYNm2b57LWk5d5dqaXa1T51prCaAUtdJ7UYJ1EEFL1-UdLw4WCFFsXxYlIjJRhqVTEWcwWVlbKmGtdmbStJUIJ6FV2FVjjhA8tinZKrVAXQHVdTdfUVBCA0o5daMELwMVhlGyAiJRyAxVG-B6RpGFCCZ32Hr9mVLfe7Jmg4QoBCEYT8mDticmVOw3F5PnFQjUltfQFD1OiGBQKglQFHRIKlFAsB0GQGDZrms4Ju0I54CmUsy3LCtbtr055vuaU-SWrEPkYRg2W4jZcxygpOByd6VpyZhWvyChc+4+wio1PqI+dxt4LL8uKwQyuggQ6uaxbu5zngC4Iliy5opiOLKibsfmzuVsFjbjN25ZDtO3lHLWDsQpey5tyCs+lyXNsb4Pr+op4Fg4HwNM4cS0BZlM4tSwALRGDYd6T244tDsFjAgdwkBj5X-28ne4SmuxlbRPs-Fdtsi9BQGcoAgUG-HpZLhPnSvKVh3n6e3eZVO0EYS2UYQpuT3Lx-wR0lmmIM45CjFFVndWCLQb5-RZoEX2nEXA2Bfp+Ewd4HAPwFLWT2tkuxnyRsFDcoFCgqjVAQYetA4HMyWI7VBNkQbVREpcDBLluROEYWEAUbgOQKF2I+QhkdQFjkVIUScOZLa63gcxWhxg3Au2rHaB8PIayoJdpgtwVYXR2hrFxWwodAGSSXhfVeYi6DgUghAaBmZiSD1trff6LcnbmnfBEbkFpPx3gCJWLhtwypWl8jyIRICMChRoRPRA6w1g2XcCcQ61VuRsNZLccqjxO4O1smYPsYdmrAORqja6PUMbDBgmACJrEXB3gUZwwWqCA7RHYgApqQCR7BUKd1KAt1MaEguldTpFTLLWDvNsYS7ZeGOH4aMo6zSqHnx+NLaOps45QATqrexFdHEsxMPsZ2+VuFFWqiMnx1YCo7MFMJHYDUjGBSIVkRZMcFZKxVgUZOWsS7SOZrIyJyxO57PMAc-YRzm6vi4Z7KGrhvyBASAkIAA */
  createMachine(
    {
      id: 'AudioEngineMachine',
      description: `The Audio Engine Machine`,
      predictableActionArguments: true,
      tsTypes: {} as import('./audio-engine.machine.typegen').Typegen0,
      schema: {
        context: {} as Context,
        services: {} as Service,
        events: {} as Events,
      },
      context: {
        error: undefined,
        audioEngine: undefined,
        updateAudioEngineInterval: 100,
        mlModelUrl: ''
      },
      initial: 'unitialized',
      states: {
        unitialized: {
          on: {
            INITIALIZE: 'initializing'
          }
        },

        initializing: {
          states: {
            gettingMicrophoneAccess: {
              invoke: {
                id: 'getMicrophoneAccess',
                src: 'getMicrophoneAccess',
                onError: {
                  target: 'deniedMicrophoneAccess'
                },
                onDone: {
                  target: '#AudioEngineMachine.initializing.creatingAudioEngine'
                }
              }
            },
            creatingAudioEngine: {
              description: `This instantiates a new AudioEngine`,
              entry: 'createAudioEngine',
              always: {
                target: 'AIPitchDetection'
              }
            },

            AIPitchDetection: {
              invoke: {
                id: 'initiateAIPitchDetection',
                src: 'intiateAIPitchDetection',
                onError: {
                  actions: 'setError',
                  target: '#AudioEngineMachine.unitialized'
                },
                onDone: {
                  actions: 'updateAudioEngine',
                  target: '#AudioEngineMachine.idle'
                }
              }
            },

            deniedMicrophoneAccess: {
              entry: 'setError',
              description: `It can happen that the user denies access to the microphone.
If that's the case it will end up in this state, so we can show an error message`,

              on: {
                RETRY_GET_MICROPHONE_ACCESS: {
                  target: 'gettingMicrophoneAccess'
                }
              }
            }
          },
          initial: 'gettingMicrophoneAccess',
          description: `This is the initializing child state which will request the microphone access and initialize the AudioEngine`
        },

        idle: {
          on: {
            START_LISTENING_TO_MICROPHONE: {
              target: 'listeningToMicrophone',
              actions: 'startListeningToMicrophone'
            },

            CONFIGURE_SETTINGS: {
              target: 'configuringSettings'
            }
          }
        },

        listeningToMicrophone: {
          description: `The AudioEngine is actively listening to the microphone`,

          states: {
            listening: {
              on: {
                UPDATE_AUDIO_ENGINE: {
                  target: 'listening',
                  internal: true,
                  actions: 'updateAudioEngine'
                }
              },

              invoke: {
                id: 'updateAudioEnginePeriodically',
                src: 'updateAudioEnginePeriodically'
              }
            }
          },

          initial: 'listening',

          on: {
            STOP_LISTENING_TO_MICROPHONE: {
              target: 'idle',
              actions: 'stopListeningToMicrophone'
            },

            CONFIGURE_SETTINGS: {
              target: 'configuringSettings'
            },
          }
        },
        configuringSettings: {
          type: 'parallel',

          states: {
            aiPitchDetection: {
              invoke: {
                id: 'configureAIPitchDetection',
                src: 'configureAIPitchDetection',
                onDone: {
                  target: '#AudioEngineMachine.idle',
                  actions: 'updateAudioEngine'
                },
                onError: {
                  target: '#AudioEngineMachine.idle',
                  actions: 'setError'
                }
              }
            }
          },

          description: `This state manages the configuration of the audio engine settings.
I.e.: the enabling/disabling of A.I. based pitch detection`
        }
      }
    },
    {
      actions: {
        setError: assign({
          error: (_ctx, event) => event.data // as Error
        }),
        createAudioEngine: assign({
          audioEngine: (ctx, event) =>
            new AudioEngine({ mediaStream: event.data })
        }),
        startListeningToMicrophone: ({ audioEngine }) => {
          audioEngine?.startListeningToMicrophone();
        },
        stopListeningToMicrophone: ({ audioEngine }) => {
          audioEngine?.stopListeningToMicrophone();
        },
        updateAudioEngine: assign({
          audioEngine: (ctx, _event) => ctx.audioEngine
        })
      },
      services: {
        getMicrophoneAccess: async (): Promise<MediaStream> => {
          return navigator.mediaDevices.getUserMedia({ audio: true });
        },
        updateAudioEnginePeriodically:
          ({ updateAudioEngineInterval }, _event) =>
          (callback, _onReceive) => {
            // the audioEngine needs to be updated on a regular basis
            // to get the new values
            const id = setInterval(
              () => callback('UPDATE_AUDIO_ENGINE'),
              updateAudioEngineInterval
            );

            // Perform cleanup
            return () => clearInterval(id);
          },
        intiateAIPitchDetection: async ({ audioEngine, mlModelUrl }) => {
          await audioEngine?.initAIPitchDetection(mlModelUrl);

          audioEngine?.setUseAIPitchDetection(true);
        },
        configureAIPitchDetection: async (
          { audioEngine, mlModelUrl },
          event: Service['configureAIPitchDetection']
        ): Promise<void> => {
          if (
            event.data.useAIPitchDetection === true &&
            !audioEngine?.isAIPitchDetectorInitialized
          ) {
            await audioEngine?.initAIPitchDetection(mlModelUrl);
          }

          if (event.data.useAIPitchDetection === true) {
            audioEngine?.setUseAIPitchDetection(true);
          } else if (event.data.useAIPitchDetection === false) {
            audioEngine?.setUseAIPitchDetection(false);
          }
        }
      }
    }
  );
