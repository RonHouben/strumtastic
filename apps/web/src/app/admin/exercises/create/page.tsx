'use client';

import { trpc } from '@client/trpc';
import { ExerciseForm } from 'ui/components';
import { FormikHelpers } from 'formik';
import { exercisesSchemas } from '@server/routers/exercises.schema';

type CreateExerciseValues = typeof exercisesSchemas.create._output;

export default function CreateExercisePage() {
  const { mutate, data, isError, isLoading, error } =
    trpc.exercises.create.useMutation();

  const handleSubmit = (
    values: CreateExerciseValues,
    { setSubmitting, resetForm }: FormikHelpers<CreateExerciseValues>,
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
    <ExerciseForm
      initialValues={{
        title: '',
        key: '',
        isEnabled: true,
        notesToPlay: [],
      }}
      handleSubmit={handleSubmit}
      validationSchema={exercisesSchemas.create}
    />
  );
}
