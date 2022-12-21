'use client';

import { Suspense } from 'react';
import { CheckMicrophonePermissions } from 'ui/components/AudioEngine';
import Loading from '../loading';

export default function TunerPage() {
	return (
		<Suspense fallback={<Loading />}>
			<CheckMicrophonePermissions />
			<div>Whohoo got microphone access</div>
		</Suspense>
	)
}
