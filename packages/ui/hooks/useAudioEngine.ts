'use client';

import { useContext } from 'react';
import { AudioEngineContext, IAudioEngineContext } from '../providers/AudioEngineProvider';

export function useAudioEngine(): IAudioEngineContext {
	return useContext(AudioEngineContext);
}