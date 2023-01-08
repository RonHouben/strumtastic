'use client';

import { trpc } from '@client/trpc';
import { IMusicNote, MusicKey } from 'music-notes';
import {
  AutoComplete,
  Button,
  Form,
  GuitarFretboard,
  InputField,
  InputLabel,
  Switch,
} from 'ui/components';
import { SelectOption } from 'ui/types';
import { FormikHelpers } from 'formik';
import { exercisesSchemas } from '@server/routers/exercises.schema';
import { useMusicNotes } from 'ui/hooks/useMusicNotes';
import InputWrapper from 'ui/components/Form/InputWrapper';

interface AutoCompleteOption extends SelectOption {
  key: MusicKey;
}

type FormState = typeof exercisesSchemas.create._output;

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
  { id: 24, key: 'G# minor' },
];

const initialValues: FormState = {
  title: '',
  key: '',
  isEnabled: true,
  notesToPlay: [],
};

export default function CreateExercisePage() {
  const { getMusicNotesByNames } = useMusicNotes();

  const { mutate, data, isError, isLoading, error } =
    trpc.exercises.create.useMutation({});

  const handleClickNote = (
    clickedMusicNote: IMusicNote,
    formState: FormState,
    setFormikFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined,
    ) => void,
  ) => {
    const exists = formState.notesToPlay.some(
      (noteToPlay) => noteToPlay === clickedMusicNote.name,
    );

    if (exists) {
      // remove the note
      setFormikFieldValue(
        'notesToPlay',
        formState.notesToPlay.filter(
          (noteToPlay) => noteToPlay !== clickedMusicNote.name,
        ),
      );
    } else {
      setFormikFieldValue('notesToPlay', [
        ...formState.notesToPlay,
        clickedMusicNote.name,
      ]);
    }
  };

  const handleSubmit = (
    values: FormState,
    { setSubmitting, resetForm }: FormikHelpers<FormState>,
  ) => {
    mutate(values, {
      onError: () => {
        setSubmitting(false);
        // TODO: show Toaster Error message
      },
      onSuccess: () => {
        setSubmitting(false);
        resetForm();
        // TODO: show Toaster succes message
      },
    });
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={exercisesSchemas.create}
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
              {values.notesToPlay.toString()}
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
              notesToPlay={getMusicNotesByNames(values.notesToPlay)}
              musicKey={values.key}
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
