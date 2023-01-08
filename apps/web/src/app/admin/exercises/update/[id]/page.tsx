'use client';

import { trpc } from '@client/trpc';
import { ExerciseForm } from 'ui/components';
import { FormikHelpers } from 'formik';
import { exercisesSchemas } from '@server/routers/exercises.schema';
import Loading from 'src/app/loading';

type UpdateExerciseValues = typeof exercisesSchemas.updateById._output;

interface Props {
  params: { id: string };
}

export default function UpdateExercisePage({ params }: Props) {
  const {
    data: exercise,
    isLoading: isLoadingQuery,
    isError: isErrorQuery,
  } = trpc.exercises.getById.useQuery({ id: params.id });

  const { mutate } = trpc.exercises.updateById.useMutation();

  const handleSubmit = (
    values: UpdateExerciseValues,
    { setSubmitting, setValues }: FormikHelpers<UpdateExerciseValues>,
  ) => {
    mutate(values, {
      onError: (error) => {
        setSubmitting(false);
        // TODO: show Toaster Error message
      },
      onSuccess: (updatedExercise) => {
        setSubmitting(false);

        setValues(updatedExercise);
        // TODO: show Toaster succes message
      },
    });
  };

  return (
    <>
      {isLoadingQuery && <Loading />}
      {!isLoadingQuery && !exercise && (
        <div>Unable to find exercise with id {params.id}</div>
      )}
      {exercise && (
        <ExerciseForm
          initialValues={exercise}
          handleSubmit={handleSubmit}
          validationSchema={exercisesSchemas.updateById}
          submitButtonLabel="Update"
        />
      )}
    </>
  );
}
