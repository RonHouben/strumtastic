'use client';

import { RequestMicrophoneAccess } from 'ui/components/AudioEngine';

export default function ConnectGuitarPage() {
  return (
    <div className="flex h-screen items-center justify-center">
			 <RequestMicrophoneAccess />
    </div>
  );
}
