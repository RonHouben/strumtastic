import { FormikErrors, FormikTouched, useFormikContext } from 'formik';

interface Props<T> {
  name: string;
}

export default function ErrorMessage<T>({ name }: Props<T>) {
  const { errors, touched } = useFormikContext();

  const errorMessage = errors[name as keyof FormikErrors<T>] as string;
  const isTouched = touched[name as keyof FormikTouched<T>] as boolean;

  return (
    <>
      {isTouched && errorMessage && (
        <span className="font-semibold text-red-500">{errorMessage}</span>
      )}
    </>
  );
}

