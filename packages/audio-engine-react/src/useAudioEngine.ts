'use client';

import { useContext, useEffect } from 'react';
import { AudioEngineContext } from './AudioEngineProvider';

interface Props {
	debug?: {
		currentState?: boolean;
		context?: boolean;
	}
}

export function useAudioEngine({ debug }: Props = {})  {
	const machine = useContext(AudioEngineContext);

	// debug
	useEffect(() => {
		const state = machine[0];

		if (debug) {
			if (debug.context) {
				console.log(state.context);
			}
			if (debug.currentState) {
				console.log(JSON.stringify(state.value));
			}
		}

		return () => {};
	}, [debug, machine])

	return machine;
}