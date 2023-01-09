import { exercisesSchemas } from '@server/routers/exercises.schema';
import { IMusicNote, MusicKey } from 'music-notes';
import { SelectOption } from '../types';
import AutoComplete from './Autocomplete';
import Button from './Button';
import { Form, InputWrapper, InputField } from './Form';
import { GuitarFretboard } from './GuitarFretboard';
import Switch from './Form/Switch';
import { FormikHelpers } from 'formik';
import { ZodType } from 'zod';
import { useMusicNotes } from '../hooks/useMusicNotes';

interface Props<T extends ExerciseFormState> {
  handleSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
  validationSchema: ZodType<T>;
  initialValues: T;
  submitButtonLabel?: string;
}

interface AutoCompleteOption extends SelectOption {
  key: MusicKey;
}

export type ExerciseFormState =
  | typeof exercisesSchemas.create._output
  | typeof exercisesSchemas.updateById._output;

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

export default function ExerciseForm<T extends ExerciseFormState>({
  handleSubmit,
  validationSchema,
  initialValues,
  submitButtonLabel
}: Props<T>) {
  const { getMusicNotesByNames } = useMusicNotes();

  const handleClickNote = (
    clickedMusicNote: IMusicNote,
    formState: ExerciseFormState,
    {
      setFieldValue,
      setFieldTouched
    }: Pick<FormikHelpers<T>, 'setFieldValue' | 'setFieldTouched'>
  ) => {
    setFieldTouched('notesToPlay');

    if (formState.notesToPlay) {
      const exists =
        formState.notesToPlay.some(
          (noteToPlay) => noteToPlay === clickedMusicNote.name
        ) || false;

      if (exists) {
        // remove the note
        setFieldValue(
          'notesToPlay',
          formState.notesToPlay.filter(
            (noteToPlay) => noteToPlay !== clickedMusicNote.name
          )
        );
      } else {
        setFieldValue('notesToPlay', [
          ...formState.notesToPlay,
          clickedMusicNote.name
        ]);
      }
    }
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue, isSubmitting, setFieldTouched }) => (
        <>
          <InputWrapper label="Title" name="title" required>
            <InputField name="title" type="text" placeholder="Title" />
          </InputWrapper>

          <InputWrapper name="key" label="Select a key" required>
            <AutoComplete
              name="key"
              options={keys}
              selected={keys.find((key) => key.key === values.key)}
              labelProperty="key"
              placeholder="Select a key"
            />
          </InputWrapper>

          <InputWrapper name="isEnabled" label="Enabled" required>
            <Switch name="isEnabled" isEnabled={values.isEnabled} />
          </InputWrapper>

          <InputWrapper
            label="Select the notes to play"
            name="notesToPlay"
            required
          >
            <div>
              Selected notes:
              {values.notesToPlay?.toString()}
            </div>
          </InputWrapper>

          <div className="w-full">
            <GuitarFretboard
              viewType="exercise-order"
              showFlatsOrSharps="sharps"
              onNoteClick={(clickedMusicNote) =>
                handleClickNote(clickedMusicNote, values, {
                  setFieldValue,
                  setFieldTouched
                })
              }
              numberOfFrets={24}
              notesToPlay={getMusicNotesByNames(values.notesToPlay || [])}
              musicKey={values.key || ''}
            />
          </div>
          <Button
            size="md"
            variant="filled"
            color="secondary"
            type="submit"
            disabled={isSubmitting}
            className="w-32"
          >
            {submitButtonLabel || 'Submit'}
          </Button>
        </>
      )}
    </Form>
  );
}
