'use client';

import { OpenSheetMusicDisplayProvider } from 'react-opensheet-music-display';
import { Exercise } from 'ui/components/Exercise';

export default function TestPage() {
  return (
    <OpenSheetMusicDisplayProvider
      musicXml="http://localhost:3000/api/v1/music-xml"
      options={{
        drawTitle: true,
        autoResize: true,
        // darkMode: true,
        cursorsOptions: [
          {
            type: 0,
            color: 'red',
            alpha: 0.5,
            follow: true,
          },
        ],
      }}
    >
      <Exercise />
    </OpenSheetMusicDisplayProvider>
  );
}
