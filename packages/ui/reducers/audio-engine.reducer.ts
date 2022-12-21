import { AsyncActionHandlers } from 'use-reducer-async';
import { AudioEngine, AudioEngineDebugOptions } from 'audio-engine';
import { Reducer } from 'react';

type State =
  | 'UNINITIALIZED'
  | 'DECLINED_MICROPHONE_ACCESS'
  | 'RECEIVED_MICROPHONE_ACCESS';

export type AudioEngineReducerState = {
  audioEngine: AudioEngine | null;
  state: State;
  error?: DOMException;
};

export type AudioEngineReducerAction =
  | { type: 'REQUEST_MICROPHONE_ACCESS' }
  | {
      type: 'INITIALIZE_AUDIO_ENGINE';
      payload: {
        userMediaStream: MediaStream;
        debug?: AudioEngineDebugOptions;
      };
    }
  | { type: 'DECLINED_MICROPHONE_ACCESS'; payload: { error: DOMException } };

type AudioEngineAsyncAction = { type: 'REQUEST_MICROPHONE_ACCESS' };

export const audioEngineReducerInitialState: AudioEngineReducerState = {
  audioEngine: null,
  state: 'UNINITIALIZED'
};

export function audioEngineReducer(
  state: AudioEngineReducerState,
  action: AudioEngineReducerAction
): AudioEngineReducerState {
  if (
    state.state === 'UNINITIALIZED' &&
    action.type === 'INITIALIZE_AUDIO_ENGINE'
  ) {
    const audioEngine = new AudioEngine({
      inputAudioStream: action.payload.userMediaStream,
      debug: action.payload.debug
    });

    return { ...state, audioEngine, state: 'RECEIVED_MICROPHONE_ACCESS' };
  }

  if (
    state.state === 'UNINITIALIZED' &&
    action.type === 'DECLINED_MICROPHONE_ACCESS'
  ) {
    return {
      ...state,
      state: 'DECLINED_MICROPHONE_ACCESS',
      error: action.payload.error
    };
  }

  return state;
}

export const audioEngineAsyncActionHandlers: AsyncActionHandlers<
  Reducer<AudioEngineReducerState, AudioEngineReducerAction>,
  AudioEngineAsyncAction
> = {
  REQUEST_MICROPHONE_ACCESS:
    ({ dispatch }) =>
    async () => {
      try {
        dispatch({
          type: 'INITIALIZE_AUDIO_ENGINE',
          payload: {
            userMediaStream: await navigator.mediaDevices.getUserMedia({
              audio: true
            })
          }
        });
      } catch (err) {
        const error = err as DOMException;

        dispatch({ type: 'DECLINED_MICROPHONE_ACCESS', payload: { error } });
      }
    }
};
