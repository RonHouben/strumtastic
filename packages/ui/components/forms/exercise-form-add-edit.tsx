'use client';

import { Formik, FormikHelpers } from 'formik';
import { exercises } from '@server/actions';
import { createExerciseSchema } from '@server/schemas/exercises';
import z from 'zod';
import { Button } from '@ui/components/button';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useRouter } from 'next/navigation';
import { Input } from '@ui/components/input';
import { Form } from '@ui/components/form';
import { FormItem } from '@ui/components/form-item';
import { useFile } from '@ui/hooks/useFile';
import * as schemas from '@server/schemas';
import { OpenSheetMusicDisplay } from '../OpenSheetMusicDisplay/OpenSheetMusicDisplay';

interface Props {
  exercise?: schemas.exercises.IExercise;
}

type AddEditSchema = z.infer<typeof createExerciseSchema>;

export function ExerciseFormAddEdit({ exercise }: Props) {
  const router = useRouter();
  const { getFileData } = useFile();

  const handleUploadMusicXml = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: FormikHelpers<AddEditSchema>['setFieldValue']
  ) => {
    if (event.currentTarget.files?.length) {
      const file = event.currentTarget.files[0];
      const fileData = await getFileData(file);

      setFieldValue('musicXml', fileData);
    } else {
      setFieldValue('musicXml', '');
    }
  };

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
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <FormItem
            name="title"
            label="Title"
            type="text"
            as={Input}
            required
          />
          <FormItem name="key" label="Key" type="text" as={Input} required />
          <FormItem
            name="isEnabled"
            label="Enabled"
            type="checkbox"
            className="flex items-center gap-2"
          />
          <FormItem
            name='foo'
            label='Music XML'
            type="file"
            as={Input}
            onChange={async (event) =>
              await handleUploadMusicXml(event, setFieldValue)
            }
            required
          />
          {values.musicXml && (
            <OpenSheetMusicDisplay musicXml={values.musicXml} />
          )}

          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
