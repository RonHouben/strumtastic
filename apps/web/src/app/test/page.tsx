'use client';

import { OpenSheetMusicDisplayProvider } from 'react-opensheet-music-display';
import { Exercise } from 'ui/components/Exercise';

export default function TestPage() {
  return (
    <OpenSheetMusicDisplayProvider
      options={{
        drawTitle: true,
        autoResize: true,
        darkMode: false,
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
      <Exercise
        exercise={{
          id: '1',
          musicXml: 'http://localhost:3000/api/v1/music-xml',
          createdAt: new Date(),
          isEnabled: true,
          key: 'C',
          notesToPlay: [],
          title: 'Test',
          updatedAt: new Date(),
        }}
      />
    </OpenSheetMusicDisplayProvider>
  );
}
