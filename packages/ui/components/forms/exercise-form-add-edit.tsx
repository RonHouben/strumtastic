'use client';

import { Formik } from 'formik';
import { exercises } from '@server/actions';
import { createExerciseSchema } from '@server/schemas/exercises';
import z from 'zod';
import { Button } from '@ui/components/button';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useRouter } from 'next/navigation';
import { Input } from '@ui/components/input';
import { Form } from '@ui/components/form';
import { FormItem } from '@ui/components/form-item';

interface Props {
  exercise?: exercises.IExercise;
}

export function ExerciseFormAddEdit({ exercise }: Props) {
  const router = useRouter();

  return (
    <Formik<z.infer<typeof createExerciseSchema>>
      initialValues={{
        title: exercise?.title ?? '',
        isEnabled:
          exercise?.isEnabled !== undefined ? exercise.isEnabled : true,
        key: exercise?.key ?? '',
        musicXml: exercise?.musicXml ?? ''
      }}
      onSubmit={async (values) => {
        if (!exercise) {
          await exercises.create(values);
        } else {
          await exercises.update(exercise.id, values);
        }

        router.push('/admin/exercises');
      }}
      validationSchema={toFormikValidationSchema(createExerciseSchema)}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormItem id="title" label="Title" type="text" as={Input} required />
          <FormItem id="key" label="Key" type="text" as={Input} required />
          <FormItem id="musicXml" label="Music XML" type="text" as={Input} required />
          <FormItem
            id="isEnabled"
            label="Enabled"
            type="checkbox"
            // as={Switch}
            className="flex items-center gap-2"
          />
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
