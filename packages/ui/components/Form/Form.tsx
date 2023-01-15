'use client';

import {
  Formik,
  Form as FormikForm,
  FormikValues,
  FormikHelpers,
  FormikProps
} from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ZodType } from 'zod';
import React from 'react';

interface Props<T> {
  initialValues: T;
  onSubmit: (values: T, actions: FormikHelpers<T>) => void;
  validationSchema: ZodType<T>;
  children: (props: FormikProps<T>) => React.ReactNode;
}

export default function Form<T extends FormikValues>({
  children,
  initialValues,
  onSubmit,
  validationSchema
}: Props<T>) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema<T>(validationSchema)}
    >
      {(data) => (
        <FormikForm className="flex flex-col gap-2">
          {children(data)}
        </FormikForm>
      )}
    </Formik>
  );
}
