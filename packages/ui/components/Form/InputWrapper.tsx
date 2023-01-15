import { ReactNode } from 'react';
import ErrorMessage from './ErrorMessage';
import InputLabel from './InputLabel';

interface Props<T> {
  name: string;
  label?: string;
  children: ReactNode;
  required?: boolean;
  showErrorMessage?: boolean;
}

export default function InputWrapper<T>({
  name,
  children,
  required,
  label,
  showErrorMessage = true
}: Props<T>) {
  return (
    <>
      {label && (
        <InputLabel htmlFor={name} required={required}>
          {label}
        </InputLabel>
      )}
      {children}
      {showErrorMessage && <ErrorMessage name={name} />}
    </>
  );
}
