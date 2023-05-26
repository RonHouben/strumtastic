'use client';

import OpenSheetMusicDisplay from 'react-opensheet-music-display';
import { MusicNotes } from 'music-notes';

export default function TestPage() {
  return (
    <OpenSheetMusicDisplay
      file='http://localhost:3000/api/v1/music-xml'
      options={{
        drawTitle: true,
        autoResize: false,
        cursorsOptions: [
          {
            type: 0,
            color: 'red',
            alpha: 1,
            follow: true,
          },
        ],
      }}
      onCursorChange={(notes) => {
        if (notes[0]?.Pitch?.Frequency) {
          const musicNote = MusicNotes.getMusicNoteFromFrequency(
            notes[0].Pitch.Frequency,
          );
          console.log(notes[0].ToString());
          console.log(musicNote.pc);
        }
      }}
    />
  );
}
