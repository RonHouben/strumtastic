import { assign, createMachine } from 'xstate';
import { AudioEngine } from '..';

type Context = {
  audioEngine: AudioEngine | undefined;
  updateAudioEngineInterval: number;
  error: Error | undefined;
};

type Service = {
  getMicrophoneAccess: { data: MediaStream; onError: Error };
  updateAudioEngine: any;
  configureAIPitchDetection: { data: { useAIPitchDetection: boolean } };
};

export const audioEngineMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEECuECWB7AogOygzzAFkBDAYwAsiwA6VPDAFwzIBsMAvSAYgEkAcvwAq-ZABl+ALRwBtAAwBdRKAAOWWC2x5VIAB6IAjAHYFdEwFYTADgDMAFgCcANhMAmZzZcAaEAE9ET3c6d0sFBUs7F09rBXcbAF9EvzRMXAJacmpaOiJtDm4iKDoYZlYCEgwKACcsNSosYmQKCjhYXggm+iIANywAa3oyqtr6xubW9sUVJBANLVYmvUMEK3NLdztwo0dLFzsFGz9AhAd90OdXE1cbbxcjB2TU9Gx8QmJsmmI8plZCrjFUpgcrFUZ1BrdFptWAdMA1Oo1OhqdhkZgAMywNQAtsDmODxlCprCZnoFtplnNVus6JttgpducDkcTog7I46Ed2XYnHs4pZLM8QGk3plPpRvj0-mxOICCHRamA0cURRkPmBeKS5uSlroqcYXAo7HQ7AlokZXO5dptWWcLp4nNdbvdHkLVe8shLcvl-rKgRAwExIATIZMYR0AEo4EQRgCaAH0AOLR+MkfgAYQjAHkAAoACSzghw8eQ6fTOAAyhWtepNBS9aBqeFaVsdntmccAkF7LT7Oyjg4bEY3J43a81Z6cj8MBB2BqKyJkBGRPGpAucMJBIn4yIs6mM9n84X5MoyXXdStEM4XLSYvstjZ3O4nPZbUYFC+LFcHEZ7+ETHYY7pB64pTj0s4aumhYAGL8ImACqUbxhW0ZiFu1antq546JeawclEuwKC41gWi4TiWG+CiDqE4TxFabiWu4QGiuqXy5JwsDMIGxQiFgIYTPOu45qu-Drpu267vuma5gWRY1vM2GUo2V6uLeYQxHYj7Pq+XYIDE5juABDjuMRvJGDYlhGMxE6gZKdAcVxTAELx-HdLwUGCLBCFIShIhoYmGGzLWiw4fqCDhDef4aVpL52LaQ43g61wJEYuxhNZIGkF6PwOdxzl8dUEICfZGCcXlUC8PBOYACLICIxbIPB1X8HuG6JkIJ5BQpIVKQYxiWXQMSpYOdyWPYNy2mRli0qlU22GZjoZWKWVgQqTTohgUCoDUxQViCFRQLAdBkBgOYsNQ1UgmAFC6p03S-P0QxrXgG1bTUYDIPwZ3MBdV03To8k6qFykIEY7gRLSdhg04ETGalnanI+Jh0O+bgDvcDgKCYS2sdl9AUOtm3bbt+3FEdJ3fb9XH-U0vDwoiyKohiWK4gTL1E+9n2U1Ql3U7qgOKQ2fWg+DGxQ8+sNWuZtpOODtKWI6RzQ64YPJCkIB4FgAbwHM7rLWxxBnj1QurAAtBatqm54nIRLbdu2666t67jq2MAUsqQEb9a4cZtrBBYtEfljUM-kxTvjplBtSu7RQEF7F5hc+Rgto4AGmpjUQOJRNg27bDjRPnji7Djk52T6MqxyUZQHa5YbtPHwPC+yTgpw4aeeJEjh+1YdDkX2YSEeZ9gl7Z3rSgCQKKsqBDO7QDe9as8M3uRHgOA4LjOI8+e2j+02Oo6tgb2RUsjytZfj368oBkGEC1x9xI68F3the+Jg3qaj7r1a+cTbpYQt4HXYppzLGSSOHYC+s8Z5AgvPE2BpPw-h-FYAuphDLxTbr3Ki7c7A3Ask8cBLFS7sVKo5HiBUxihjALA3Cz5bT7GNJZYcZFHiyxMMXAhNkz7ELKk5KALlCqEhyiQ8q1CwomBMLaG4y8N5Diogcc4VhT5R2eq9YmBA9qggII-bqz8QYeGTgRQ4xE2GuHIpI84vd94PGIucHkgEOGRygWzVRO11Gky0cdU650eZ-QTk-Pxws34AKhkYkipiKK6T7HQK4Tg2GbFisZNWiQgA */
  createMachine(
    {
      id: 'AudioEngineMachine',
      description: `The Audio Engine Machine`,
      predictableActionArguments: true,
      tsTypes: {} as import('./audio-engine.machine.typegen').Typegen0,
      schema: {
        context: {} as Context,
        services: {} as Service
      },
      context: {
        error: undefined,
        audioEngine: undefined,
        updateAudioEngineInterval: 100
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
                target: '#AudioEngineMachine.idle'
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
                id: 'updateAudioEngine',
                src: 'updateAudioEngine'
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
            }
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
        startListeningToMicrophone: (ctx) => {
          ctx.audioEngine?.startListeningToMicrophone();
        },
        stopListeningToMicrophone: (ctx) => {
          ctx.audioEngine?.stopListeningToMicrophone();
        },
        updateAudioEngine: assign({
          audioEngine: (ctx, _event) => ctx.audioEngine
        })
      },
      services: {
        getMicrophoneAccess: async (): Promise<MediaStream> => {
          return await navigator.mediaDevices.getUserMedia({ audio: true });
        },
        updateAudioEngine: (ctx, _event) => (callback, _onReceive) => {
          // the audioEngine needs to be updated on a regular basis
          // to get the new values
          const id = setInterval(
            () => callback('UPDATE_AUDIO_ENGINE'),
            ctx.updateAudioEngineInterval
          );

          // Perform cleanup
          return () => clearInterval(id);
        },
        configureAIPitchDetection: async (
          ctx,
          event: Service['configureAIPitchDetection']
        ): Promise<void> => {
          if (
            event.data.useAIPitchDetection === true &&
            !ctx.audioEngine?.isAIPitchDetectorInitialized
          ) {
            await ctx.audioEngine?.initAIPitchDetection();
          }

          if (event.data.useAIPitchDetection === true) {
            ctx.audioEngine?.setUseAIPitchDetection(true);
          } else if (event.data.useAIPitchDetection === false) {
            ctx.audioEngine?.setUseAIPitchDetection(false);
          }
        }
      }
    }
  );
