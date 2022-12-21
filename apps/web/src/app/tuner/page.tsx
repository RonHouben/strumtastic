'use client';

import { useCallback, useEffect } from 'react';
import { GuitarTuner } from 'ui/components/GuitarTuner';
import { useAudioEngine } from 'ui/hooks/useAudioEngine';
import { useRouter } from 'next/navigation';

export default function TunerPage() {
  const router = useRouter();
  const [state, dispatch] = useAudioEngine();

  const handleStopTuner = useCallback(() => {
    router.push('/excercises');
  }, [router])

  // automatically route to the page to get
  // permissions for the microphone
  useEffect(() => {
    dispatch({ type: 'GET_MICROPHONE_PERMISSION_STATE' });

    if (state.microphonePermissionState === 'denied') {
      router.push('/connect-guitar');
    }
  }, [router, state, dispatch]);

  return <GuitarTuner onStopTuner={handleStopTuner} />;
}
