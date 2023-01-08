import { ReactNode } from 'react';
import { ErrorMessage } from 'formik';
import InputLabel from './InputLabel';

interface Props {
  name: string;
  label?: string;
  children: ReactNode;
  required?: boolean;
  showErrorMessage?: boolean;
}

export default function InputWrapper({
  name,
  children,
  required,
  label,
  showErrorMessage = true 
}: Props) {
  return (
    <>
      {label && (
        <InputLabel htmlFor={name} required={required}>
          {label}
        </InputLabel>
      )}
      {children}
      {showErrorMessage && (
        <ErrorMessage
          name={name}
          component="div"
          className="font-semibold text-red-500"
        />
      )}
    </>
  );
}
