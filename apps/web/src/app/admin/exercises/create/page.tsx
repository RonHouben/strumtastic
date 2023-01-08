'use client';

import { IMusicNote, MusicKey } from 'music-notes';
import { useState } from 'react';
import {
  AutoComplete,
  GuitarFretboard,
  Input,
  InputLabel,
  Switch,
} from 'ui/components';
import { SelectOption } from 'ui/types';

interface AutoCompleteOption extends SelectOption {
  key: MusicKey;
}

const people: AutoCompleteOption[] = [
  { id: 1, key: 'A major' },
  { id: 2, key: 'A minor' },
  { id: 3, key: 'A# major' },
  { id: 4, key: 'A# minor' },
  { id: 5, key: 'B major' },
  { id: 6, key: 'B minor' },
  { id: 7, key: 'C major' },
  { id: 8, key: 'C minor' },
  { id: 9, key: 'C# major' },
  { id: 10, key: 'C# minor' },
  { id: 11, key: 'D major' },
  { id: 12, key: 'D minor' },
  { id: 13, key: 'D# major' },
  { id: 14, key: 'D# minor' },
  { id: 15, key: 'E major' },
  { id: 16, key: 'E minor' },
  { id: 17, key: 'F major' },
  { id: 18, key: 'F minor' },
  { id: 19, key: 'F# major' },
  { id: 20, key: 'F# minor' },
  { id: 21, key: 'G major' },
  { id: 22, key: 'G minor' },
  { id: 23, key: 'G# major' },
  { id: 24, key: 'G# minor' },
];

export default function CreateExercisePage() {
  const [selectedNotes, setSelectedNotes] = useState<IMusicNote[]>([]);

  const handleClickNote = (clickedMusicNote: IMusicNote) => {
    const exists = selectedNotes.some(
      (selectedNote) => selectedNote.name === clickedMusicNote.name,
    );

    if (exists) {
      setSelectedNotes((prev) =>
        prev.filter(
          (selectedNote) => selectedNote.name !== clickedMusicNote.name,
        ),
      );
    } else {
      setSelectedNotes((prev) => [...prev, clickedMusicNote]);
    }
  };

  return (
    <form className="flex flex-col gap-2">
      <InputLabel htmlFor="title">Title</InputLabel>
      <Input id="title" type="text" placeholder="Title" />
      <InputLabel htmlFor="key">Key</InputLabel>
      <AutoComplete
        id="key"
        options={people}
        labelProperty="key"
        placeholder="Select a key"
      />
      <InputLabel htmlFor="enabled">Enabled</InputLabel>
      <Switch id="enabled" isEnabled />
      <InputLabel htmlFor="notesToPlay">Select the notes to play</InputLabel>
      <div>
        Selected notes:
        {selectedNotes.map((selectedNote) => selectedNote.name).join(', ')}
      </div>

      <div className="w-full">
        <GuitarFretboard
          viewType="exercise-order"
          onNoteClick={handleClickNote}
          numberOfFrets={24}
          notesToPlay={selectedNotes}
          musicKey="A major"
        />
      </div>
    </form>
  );
}
