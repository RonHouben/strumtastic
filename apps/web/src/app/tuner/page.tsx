'use client';

import { useCallback, useEffect } from 'react';
import { GuitarTuner } from 'ui/components/GuitarTuner';
import { useAudioEngine } from 'ui/hooks/useAudioEngine';
import { useRouter } from 'next/navigation';

export default function GuitarTunerPage() {
  const router = useRouter();
  const [state, dispatch] = useAudioEngine();

  const handleStopTuner = useCallback(() => {
    router.push('/exercise');
  }, [router]);

  // automatically route to the page to get
  // permissions for the microphone
  useEffect(() => {
    if (
      state.state === 'UNINITIALIZED' ||
      state.microphonePermissionState === 'denied'
    ) {
      router.push('/connect-guitar');
    }

    if (state.state !== 'UNINITIALIZED') {
      dispatch({ type: 'GET_MICROPHONE_PERMISSION_STATE' });
    }
  }, [router, state, dispatch]);

  return (
    <div className="m-2 flex flex-col min-h-screen items-center justify-center">
      <GuitarTuner onStopTuner={handleStopTuner} />
    </div>
  );
}
