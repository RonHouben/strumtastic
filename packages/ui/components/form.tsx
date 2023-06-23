import { Form as FormikForm } from 'formik';

interface Props {
  children: React.ReactNode;
}

export function Form({ children }: Props) {
  return <FormikForm className="space-y-4">{children}</FormikForm>;
}
