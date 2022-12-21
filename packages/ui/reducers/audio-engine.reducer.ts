import { AudioEngine, AudioEngineDebugOptions } from 'audio-engine';

type State =
  | 'uninitialized'
  | 'declined-microphone-access'
  | 'recieved-microphone-access';

export type AudioEngineReducerState = {
  audioEngine: AudioEngine | null;
  state: State;
	error?: DOMException;
};

export type AudioEngineReducerAction =
  | {
      type: 'initialize';
      payload: {
        userMediaStream: MediaStream;
        debug?: AudioEngineDebugOptions;
      };
    }
  | { type: 'declined-microphone-access', payload: { error: DOMException } };

export const audioEngineReducerInitialState: AudioEngineReducerState = {
  audioEngine: null,
  state: 'uninitialized'
};

export function audioEngineReducer(
  state: AudioEngineReducerState,
  action: AudioEngineReducerAction
): AudioEngineReducerState {

  if (state.state === 'uninitialized' && action.type === 'initialize') {
    const audioEngine = new AudioEngine({
      inputAudioStream: action.payload.userMediaStream,
      debug: action.payload.debug
    });

    return { ...state, audioEngine, state: 'recieved-microphone-access' };
  }

  if (state.state === 'uninitialized' && action.type === 'declined-microphone-access') {
		return { ...state, state: 'declined-microphone-access', error: action.payload.error };
  }

	return state;
}
