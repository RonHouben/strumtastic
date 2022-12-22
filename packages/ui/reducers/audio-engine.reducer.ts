import { AsyncActionHandlers } from 'use-reducer-async';
import { AudioEngine, AudioEngineDebugOptions } from 'audio-engine';
import { Reducer } from 'react';
import { IMusicNote, MusicNotes } from 'music-notes';

type State =
  | 'UNINITIALIZED'
  | 'DECLINED_MICROPHONE_ACCESS'
  | 'INITIALIZED'
  | 'LISTENING_TO_MICROPHONE'
  | 'UPDATING_CURRENT_FREQUENCY';

export type AudioEngineReducerState = {
  audioEngine: AudioEngine | null;
  state: State;
  error?: DOMException;
  readonly currentFrequency: number;
  readonly currentMusicNote: IMusicNote | undefined;
  readonly requestAnimationFrameId: number;
  readonly microphonePermissionState: PermissionState;
};

// Actions starting with # are meant to be private
// and only used for the reducer internally. I.e.: to dispatch from a async action
// to update the state
type Action =
  | { type: 'GET_MICROPHONE_ACCESS' }
  | {
      type: 'INITIALIZE_AUDIO_ENGINE';
      payload: {
        userMediaStream: MediaStream;
        debug?: AudioEngineDebugOptions;
      };
    }
  | { type: 'DECLINED_MICROPHONE_ACCESS'; payload: { error: DOMException } }
  | { type: 'START_LISTENING_TO_MICROPHONE' }
  | {
      type: 'SET_CURRENT_FREQUENCY_AND_NOTE';
      payload: { requestAnimationFrameId: number };
    }
  | { type: 'STOP_LISTENING_TO_MICROPHONE' }
  | {
      type: '#SET_MICROPHONE_PERMISSION_STATE';
      payload: { permissionState: PermissionState };
    };

type AsyncAction =
  | { type: 'GET_MICROPHONE_ACCESS' }
  | { type: 'GET_MICROPHONE_PERMISSION_STATE' };

export type AudioEngineReducerAction = Action | AsyncAction;

export const audioEngineReducerInitialState: AudioEngineReducerState = {
  audioEngine: null,
  state: 'UNINITIALIZED',
  currentFrequency: -1,
  currentMusicNote: undefined,
  requestAnimationFrameId: -1,
  microphonePermissionState: 'prompt',

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

    return {
      ...state,
      audioEngine,
      state: 'INITIALIZED',
      microphonePermissionState: 'granted'
    };
  }

  if (
    state.state === 'UNINITIALIZED' &&
    action.type === 'DECLINED_MICROPHONE_ACCESS'
  ) {
    return {
      ...state,
      state: 'DECLINED_MICROPHONE_ACCESS',
      error: action.payload.error,
      microphonePermissionState: 'denied'
    };
  }

  if (
    state.state === 'INITIALIZED' &&
    action.type === 'START_LISTENING_TO_MICROPHONE'
  ) {
    state.audioEngine!.startInputAudioStream();

    return {
      ...state,
      state: 'LISTENING_TO_MICROPHONE'
    };
  }

  if (action.type === '#SET_MICROPHONE_PERMISSION_STATE') {
    return {
      ...state,
      microphonePermissionState: action.payload.permissionState
    };
  }

  if (
    state.state === 'LISTENING_TO_MICROPHONE' &&
    action.type === 'SET_CURRENT_FREQUENCY_AND_NOTE'
  ) {
    return {
      ...state,
      currentFrequency: state.audioEngine!.currentFrequency,
      currentMusicNote: MusicNotes.getMusicNoteFromFrequency(state.audioEngine!.currentFrequency),
      requestAnimationFrameId: action.payload.requestAnimationFrameId
    };
  }

  if (
    state.state === 'LISTENING_TO_MICROPHONE' &&
    action.type === 'STOP_LISTENING_TO_MICROPHONE'
  ) {
    state.audioEngine!.stopInputAudioStream();
    cancelAnimationFrame(state.requestAnimationFrameId);

    return {
      ...state,
      state: 'INITIALIZED',
      requestAnimationFrameId: -1,
      currentFrequency: -1
    };
  }

  console.warn(
    `AudioEngineReducer: action "${action.type}" has not been implemented for state "${state.state}".`
  );

  return state;
}

export const audioEngineAsyncActionHandlers: AsyncActionHandlers<
  Reducer<AudioEngineReducerState, AudioEngineReducerAction>,
  AsyncAction
> = {
  GET_MICROPHONE_ACCESS:
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
    },
  GET_MICROPHONE_PERMISSION_STATE:
    ({ dispatch }) =>
    async () => {
      const microphonePermissionStatus = await navigator.permissions.query({
        name: 'microphone' as PermissionName
      });

      dispatch({
        type: '#SET_MICROPHONE_PERMISSION_STATE',
        payload: { permissionState: microphonePermissionStatus.state }
      });
    }
};