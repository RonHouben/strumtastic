'use client';

import OpenSheetMusicDisplay from 'react-opensheet-music-display';
import { MusicNotes } from 'music-notes';

export default function TestPage() {
  return (
    <OpenSheetMusicDisplay
      file="https://raw.githubusercontent.com/opensheetmusicdisplay/opensheetmusicdisplay/e9859a205fe1e80a1ec0d4aaa6f9670c90ac31d4/test/data/test_tabs_4_strings_bass_guitar.musicxml"
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
