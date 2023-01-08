import { exercisesSchemas } from '@server/routers/exercises.schema';
import { IMusicNote, MusicKey } from 'music-notes';
import { SelectOption } from '../types';
import AutoComplete from './Autocomplete';
import Button from './Button';
import { Form, InputWrapper, InputField } from './Form';
import { GuitarFretboard } from './GuitarFretboard';
import Switch from './Switch';
import { FormikHelpers, FormikValues } from 'formik';
import { ZodType } from 'zod';
import { useMusicNotes } from '../hooks/useMusicNotes';

interface Props<T extends FormikValues> {
  handleSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
  validationSchema: ZodType<T>;
	initialValues: T;
}

interface AutoCompleteOption extends SelectOption {
  key: MusicKey;
}

export type ExerciseFormState =
  | typeof exercisesSchemas.create._output
  | typeof exercisesSchemas.update._output;

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

export default function ExerciseForm<T extends FormikValues>({
  handleSubmit,
  validationSchema,
	initialValues
}: Props<T>) {
  const { getMusicNotesByNames } = useMusicNotes();

  const handleClickNote = (
    clickedMusicNote: IMusicNote,
    formState: ExerciseFormState,
    setFormikFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    if (formState.notesToPlay) {
      const exists =
        formState.notesToPlay.some(
          (noteToPlay) => noteToPlay === clickedMusicNote.name
        ) || false;

      if (exists) {
        // remove the note
        setFormikFieldValue(
          'notesToPlay',
          formState.notesToPlay.filter(
            (noteToPlay) => noteToPlay !== clickedMusicNote.name
          )
        );
      } else {
        setFormikFieldValue('notesToPlay', [
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
      {({ values, setFieldValue, isSubmitting, isValid }) => (
        <>
          <InputWrapper label="Title" name="title">
            <InputField name="title" type="text" placeholder="Title" />
          </InputWrapper>

          <InputWrapper name="key" label="Select a key">
            <AutoComplete
              name="key"
              options={keys}
              labelProperty="key"
              placeholder="Select a key"
              onChange={({ key }) => setFieldValue('key', key)}
            />
          </InputWrapper>

          <InputWrapper name="isEnabled" label="Enabled">
            <Switch
              name="isEnabled"
              isEnabled={values.isEnabled}
              onChange={(isEnabled) => setFieldValue('isEnabled', isEnabled)}
            />
          </InputWrapper>

          <InputWrapper label="Select the notes to play" name="notesToPlay">
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
                handleClickNote(clickedMusicNote, values, setFieldValue)
              }
              numberOfFrets={24}
              notesToPlay={getMusicNotesByNames(values.notesToPlay || [])}
              musicKey={values.key || ''}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-32"
          >
            Create
          </Button>
        </>
      )}
    </Form>
  );
}
