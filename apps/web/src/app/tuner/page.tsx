'use client';

import { useCallback } from 'react';
import { GuitarTuner } from 'ui/components/GuitarTuner';
import { useRouter } from 'next/navigation';

export default function GuitarTunerPage() {
  const router = useRouter();

  const handleStopTuner = useCallback(() => {
    router.push('/exercise');
  }, [router]);

  return (
    <div className="m-2 flex flex-col min-h-screen items-center justify-center">
      <GuitarTuner onStopTuner={handleStopTuner} />
    </div>
  );
}
