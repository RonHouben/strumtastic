'use client';

import { api } from '@client/trpc';
import { ExerciseForm } from 'ui/components/Admin/';
import { FormikHelpers } from 'formik';
import { exercisesSchemas } from '@server/routers/exercises.schema';
import { useRouter } from 'next/navigation';

type CreateExerciseValues = typeof exercisesSchemas.create._output;

export default function CreateExercisePage() {
  const { mutate, data, isError, isLoading, error } =
    api.exercises.create.useMutation();
  
  const router = useRouter();

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

        router.push('/admin/exercises');
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
        musicXml: ''
      }}
      handleSubmit={handleSubmit}
      validationSchema={exercisesSchemas.create}
      submitButtonLabel='Create'
    />
  );
}
