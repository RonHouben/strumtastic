import { exercises } from '@server/actions';
import { MusicKey } from 'music-notes';
import { SelectOption } from '../../types';
import AutoComplete from '../Autocomplete';
import Button from '../Button';
import { InputField, InputWrapper } from '../Form';
import Switch from '../Form/Switch';

interface Props {
  exercise: exercises.IExercise;
}

interface AutoCompleteOption extends SelectOption {
  key: MusicKey;
}

const keys: AutoCompleteOption[] = [
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
  { id: 24, key: 'G# minor' }
];

export default function ExerciseFormEdit({ exercise }: Props) {
  return (
    <form>
      <InputWrapper label="Title" name="title" required>
        <InputField name="title" type="text" placeholder="Title" />
      </InputWrapper>

      <InputWrapper name="key" label="Select a key" required>
        <AutoComplete
          name="key"
          options={keys}
          selected={keys.find(({ key }) => key === exercise.key )}
          labelProperty="key"
          placeholder="Select a key"
        />
      </InputWrapper>

      <InputWrapper name="isEnabled" label="Enabled" required>
        <Switch name="isEnabled" isEnabled={exercise.isEnabled} />
      </InputWrapper>
      <Button
        size="md"
        variant="filled"
        color="secondary"
        type="submit"
        className="w-32"
      >
        Save
      </Button>
    </form>
  );
}
